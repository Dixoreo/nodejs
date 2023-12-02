const signup = require("../../models/Register");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcrypt");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signup.findOne({ email: email });

    if (!user) {
      return res
        .header("auth_token", token)
        .json({ status: 400, message: "No user exists with this email" });
    }

    // Assuming you have a function to validate the password
    // const isPasswordValid = validatePassword(password, user.password);

    // if (!isPasswordValid) {
    //   return res.status(401).json({ status: 401, message: "Invalid password" });
    // }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }
    // If the email and password are valid, generate a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    // Return the token and user data as a response
    res.header("auth_token", token).send(user);
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Login failed", status: 500 });
  }
};

module.exports = login;
