const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verification = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verification;
    req.token = token;
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
};

// const jwt = require("jsonwebtoken");

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header("x-auth-token");
//         if (!token)
//             return res.status(401).json({ msg: "No auth token, access denied" });

//         const verified = jwt.verify(token, "passwordKey");
//         if (!verified)
//             return res
//                 .status(401)
//                 .json({ msg: "Token verification failed, authorization denied." });

//         req.user = verified.id;
//         req.token = token;
//         next();
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// module.exports = auth;
