const register = require("../../models/Register");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcrypt");
const signup = async (req, res) => {
  console.log("signup called");
  let path = "no-profile-picture-placeholder.png";
  try {
    // Check if the email and phone number already exist in the database
    const emailExist = await register.findOne({ email: req.body.email });
    const phoneExist = await register.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    if (emailExist) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email already exists",
      });
    }

    if (phoneExist) {
      return res.status(400).json({
        statusCode: 400,
        message: "Phone number already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(req.body.password, 8);
    // Create a new user based on the schema
    const newUser = new register({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
      profile: path,
      type: "user",
      location: req.body.location,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Generate a JWT token for the user
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);

    console.log(savedUser);
    console.log("User registered successfully");

    // Return the token and user data as a response
    res.header("auth_token", token).send(savedUser);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(400).json({ message: "Registration failed", status: 400 });
  }
};

module.exports = signup;

// authrouter.post("/api/signup", async (req, res) => {
//   try {
//       const { name, email, password, fcm_token } = req.body;

//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//           return res
//               .status(400)
//               .json({ msg: "User with same email already exists!" });
//       }

//       const hashedPassword = await bcryptjs.hash(password, 8);

//       let user = new User({
//           email,
//           password: hashedPassword,
//           name,
//           fcm_token
//       });
//       user = await user.save();
//       res.json(user);
//   } catch (e) {
//       res.status(500).json({ error: e.message });
//   }
// });
// const bcryptjs = require("bcrypt");
