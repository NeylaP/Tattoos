const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const userController = {};

userController.getAll = async (req, res) => {
   try {
      const users = await User.findAll({
         attributes: { exclude: ["createdAt", "updatedAt", "password", "role_id"] },
         include: [
             {
                 model: Role,
                 as: "role",
                 attributes: { exclude: ["createdAt", "updatedAt"] },
             },
         ],
     });

      res.status(200).json({
         success: true,
         message: "Users retreived successfully",
         data: users,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error retreiving users",
         error: error.message,
      });
   }
};

userController.getByEmail = async (req, res) => {
   const userEmail = req.query.email;
   try {
      const user = await User.findOne({
         include: [
            {
               model: Role,
               as: "role",
               attributes: { exclude: ["createdAt", "updatedAt"] },
            },
         ],
         where: {
            email: userEmail,
         },
         attributes: { exclude: ["createdAt", "updatedAt", "password", "role_id"] },
      });
      if (!user) {
         return res.status(404).json({
            success: true,
            message: "User not found",
         });
      }
      user_role = user.role ? user.role.name : null;
      
      res.status(200).json({
         success: true,
         message: "User retreived successfully",
         data: user,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error retreinving user",
         error: error.message,
      });
   }
};

userController.update = async (req, res) => {
   const userId = req.params.id;
   const userRole = req.params.role;
   try {
      if (req.body && Object.keys(req.body).length === 0) {
         return res.status(404).json({
            success: true,
            message: "Invalid data",
         });
      }
      const userToUpdate = await User.findByPk(userId);

      if (!userToUpdate) {
         return res.status(404).json({
            success: true,
            message: "User not found",
         });
      }

      userToUpdate.role_id = userRole;

      await userToUpdate.save();

      res.status(200).json({
         success: true,
         message: "User updated successfully",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error updating user",
         error: error.message,
      });
   }
};

userController.delete = async (req, res) => {
   const userId = req.params.id;

   try {
      const deleteResult = await User.destroy({
         where: {
            id: userId,
         },
      });

      if (deleteResult === 0) {
         return res.status(404).json({
            success: true,
            message: "User not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "User deleted successfully",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error deleting user",
         error: error.message,
      });
   }
};

userController.getUserProfile = async (req, res) => {
   const userId = req.tokenData.userId;

   try {
      const user = await User.findByPk(userId, {
         attributes: { exclude: ["createdAt", "updatedAt", "password", "role_id"] },
         include: [
            {
                model: Role,
                as: "role",
                attributes: { exclude: ["createdAt", "updatedAt"] },
            },
        ],
      });

      res.status(200).json({
         success: true,
         message: "User retreived successfully",
         data: user,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error retreinving user",
         error: error.message,
      });
   }
};

userController.updateUserProfile = async (req, res) => {
   const userId = req.tokenData.userId;
   const { password, role_id, ...restUserData } = req.body;

   try {
      const userToUpdate = await User.findByPk(userId);

      if (!userToUpdate) {
         return res.status(404).json({
            success: true,
            message: "User not found",
         });
      }

      if (password) {
         const hashedPassword = bcrypt.hashSync(password, 10);
         userToUpdate.password = hashedPassword;
      }

      userToUpdate.set({
         ...userToUpdate,
         ...restUserData,
      });

      await userToUpdate.save();

      res.status(200).json({
         success: true,
         message: "User updated successfully",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error updating user",
         error: error.message,
      });
   }
};

userController.getTattooArtist = async (req, res) => {
   try {
      const user = await User.findAll({
         where: {
            role_id: 4,
         },
         attributes: { exclude: ["createdAt", "updatedAt", "password", "role_id", "email"] },
      });

      if (!user) {
         return res.status(404).json({
            success: true,
            message: "No tattoo artists",
         });
      }

      res.status(200).json({
         success: true,
         message: "Users retreived successfully",
         data: user,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error retreinving user",
         error: error.message,
      });
   }
};

module.exports = userController;