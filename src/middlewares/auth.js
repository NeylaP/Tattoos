const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   const token = req.headers.authorization?.split(" ")[1];

   if (!token)
      return res.status(401).json({
         success: true,
         message: "Unauthorized",
      });

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Modify request object to include payload
      req.tokenData = {
         userId: decoded.userId,
         userRoleName: decoded.userRoleName,
      };

      next();
   } catch (error) {
      res.status(401).json({
         success: true,
         message: "Invalid token provided",
      });
   }
};
