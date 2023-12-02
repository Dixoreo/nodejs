const jwt = require("jsonwebtoken");
const socketauth = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return console.log("access denied");
  }
  try {
    const verification = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verification) {
      next();
    }
  } catch (err) {
    return console.log("invalid token");
  }
};
module.exports = socketauth;
