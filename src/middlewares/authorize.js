module.exports = (...allowedRoles) => {
   return (req, res, next) => {
      const userRoleName = req.tokenData.userRoleName;
      // Roles that always have access
      const adminGroupRoles = ["admin"];

      // Access if user belongs to admin group
      if (adminGroupRoles.includes(userRoleName)) {
         return next();
      }

      // Access if the user role is in the allowed roles
      if (allowedRoles.includes(userRoleName)) {
         return next();
      }

      // If nome of the condition are met, reject the request
      res.status(403).json({
         success: true,
         message: "Forbidden access",
      });
   };
};
