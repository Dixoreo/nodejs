const axios = require("axios");

const OTPGen = async (req, res) => {
  console.log(req.body);
  const randomOTP = Math.floor(Math.random() * 9000) + 1000;
};

module.exports = OTPGen;
