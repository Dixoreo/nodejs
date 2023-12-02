const mongoose = require("mongoose");
require("dotenv/config");
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((e) => {
    console.log("Connection Not Generated", e);
  });
