const { where } = require("sequelize");
const { Appointment } = require("../models");
const appointmentController = {};

appointmentController.getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            where: {user_id: 7},
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        res.status(200).json({
            success: true,
            message: "Appointments retreived successfully",
            data: appointments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retreiving appointments",
            error: error.message,
        });
    }
};

appointmentController.getById = async (req, res) => {
    const appointmentId = req.params.id;
    console.log(appointmentId);
    try {
        const appointment = await Appointment.findByPk(appointmentId,{
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        if (!appointment) {
            return res.status(404).json({
                success: true,
                message: "User not found",
                data: appointmentId
            });
        }

        res.status(200).json({
            success: true,
            message: "User retreived successfully",
            data: appointment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retreinving user",
            error: error.message,
        });
    }
};

// userController.update = async (req, res) => {
//     const userId = req.params.id;
//     const { password, role_id, ...restUserData } = req.body;
 
//     try {
//         if (req.body && Object.keys(req.body).length === 0) {
//             return res.status(404).json({
//                 success: true,
//                 message: "Invalid data",
//              });
//          }
//        const userToUpdate = await User.findByPk(userId);
 
//        if (!userToUpdate) {
//           return res.status(404).json({
//              success: true,
//              message: "User not found",
//           });
//        }
 
//        if (password) {
//           const hashedPassword = bcrypt.hashSync(password, 10);
//           userToUpdate.password = hashedPassword;
//        }
 
//        userToUpdate.set({
//           ...userToUpdate,
//           ...restUserData,
//        });
 
//        await userToUpdate.save();
 
//        res.status(200).json({
//           success: true,
//           message: "User updated successfully",
//        });
//     } catch (error) {
//        res.status(500).json({
//           success: false,
//           message: "Error updating user",
//           error: error.message,
//        });
//     }
//  };

//  userController.delete = async (req, res) => {
//     const userId = req.params.id;
 
//     try {
//        const deleteResult = await User.destroy({
//           where: {
//              id: userId,
//           },
//        });
 
//        if (deleteResult === 0) {
//           return res.status(404).json({
//              success: true,
//              message: "User not found",
//           });
//        }
 
//        res.status(200).json({
//           success: true,
//           message: "User deleted successfully",
//        });
//     } catch (error) {
//        res.status(500).json({
//           success: false,
//           message: "Error deleting user",
//           error: error.message,
//        });
//     }
//  };
 
module.exports = appointmentController;