const { where } = require("sequelize");
const { Appointment } = require("../models");
const appointmentController = {};

appointmentController.create = async (req, res) => {
    const { appointment_date, user_id, service_id } = req.body;
 
    try {
       if (!appointment_date || !user_id || !service_id) {
          return res.status(400).json({
             success: true,
             message: "Invalid appointment date, user or service",
          });
       }
 
       await Appointment.create({
            appointment_date,
            user_id,
            service_id,
       });
 
       res.status(200).json({
          success: true,
          message: "Appointment created successfully",
       });
    } catch (error) {
       res.status(500).json({
          success: false,
          message: "Error creating Appointment",
          error: error.message,
       });
    }
 };

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

appointmentController.update = async (req, res) => {
    const appointmentId = req.params.id;
    const { ...restAppointmentData } = req.body;
 
    try {
        if (req.body && Object.keys(req.body).length === 0) {
            return res.status(404).json({
                success: true,
                message: "Invalid data",
             });
         }
       const appointmentToUpdate = await Appointment.findByPk(appointmentId);
 
       if (!appointmentToUpdate) {
          return res.status(404).json({
             success: true,
             message: "Appointment not found",
          });
       }
 
       appointmentToUpdate.set({
          ...appointmentToUpdate,
          ...restAppointmentData,
       });
 
       await appointmentToUpdate.save();
 
       res.status(200).json({
          success: true,
          message: "Appointment updated successfully",
       });
    } catch (error) {
       res.status(500).json({
          success: false,
          message: "Error updating Appointment",
          error: error.message,
       });
    }
};

appointmentController.delete = async (req, res) => {
    const appointmentId = req.params.id;
 
    try {
       const deleteResult = await Appointment.destroy({
          where: {
             id: appointmentId,
          },
       });
 
       if (deleteResult === 0) {
          return res.status(404).json({
             success: true,
             message: "Appointment not found",
          });
       }
 
       res.status(200).json({
          success: true,
          message: "Appointment deleted successfully",
       });
    } catch (error) {
       res.status(500).json({
          success: false,
          message: "Error deleting appointment",
          error: error.message,
       });
    }
};
 
module.exports = appointmentController;