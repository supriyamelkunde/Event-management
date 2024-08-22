const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");

const authenticate = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded token data to the request object

      // check the user role is organizer
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.role !== "Organizer") {
        return res
          .status(403)
          .json({ message: "Access denied. You are not an organizer." });
      }
      
      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  } else {
    res.status(403).json({ message: "Authorization token is missing" });
  }
};

module.exports = authenticate;
