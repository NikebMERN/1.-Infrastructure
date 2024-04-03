//? Importing needed packages
const jwt = require("jsonwebtoken");

//? Middleware function to authenticate user requests
const authenticateUser = (req, res, next) => {
  //* Extract the token from the request headers
  const token = req.headers.authorization;

  //* Checking the token
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided. Authentication failed." });
  }

  try {
    //* Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; //* Attach user information to the request object
    next(); //* Call next middleware
  } catch (error) {
    console.error("Authentication failed:", error.message);
    return res
      .status(401)
      .json({ message: "Invalid token. Authentication failed." });
  }
};

module.exports = authenticateUser;
