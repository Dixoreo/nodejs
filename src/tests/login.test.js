const axios = require("axios");
test('Load balancing distributes requests evenly', async () => {
  // Simulate multiple concurrent requests
  const requests = Array(10000).fill().map(() => axios.post('http://192.168.10.7:5000/user/login'));

  // Wait for all requests to complete
  const responses = await Promise.all(requests);

  // Perform assertions on the responses to verify load balancing behavior
  const counts = new Map(); // Map to track the number of responses per server instance

  responses.forEach((response) => {
    const serverInstance = response.headers['x-server-instance']; // Assuming the server instance information is in a custom header, adjust accordingly
    if (counts.has(serverInstance)) {
      counts.set(serverInstance, counts.get(serverInstance) + 1);
    } else {
      counts.set(serverInstance, 1);
    }
  });

  const expectedRequestsPerInstance = 10000 / counts.size; // Expected number of requests per server instance

  counts.forEach((count, serverInstance) => {
    // Assert that the number of responses for each server instance is close to the expected value
    expect(count).toBeCloseTo(expectedRequestsPerInstance, 0); // Tolerance can be adjusted as per your specific requirements
  });
},20000000);
