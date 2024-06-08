const { Op } = require("sequelize");
const { Appointment, Service, User } = require("../models");
const appointmentController = {};
const { dateValidator } = require("../helpers/validators");

appointmentController.create = async (req, res) => {
   const { appointment_date, user_id, service_id } = req.body;

   try {
      if (!appointment_date || !user_id || !service_id || !dateValidator(appointment_date)) {
         return res.status(400).json({
            success: true,
            message: "Invalid appointment date, user or service",
         });
      }

      if (validateAppointment(user_id)) {
         return res.status(400).json({
            success: true,
            message: "Already has an appointment pending",
         });
      };

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
      const userId = req.tokenData.userId;
      const appointments = await Appointment.findAll({
         where: { user_id: 4 },
         attributes: { exclude: ["createdAt", "updatedAt", "user_id", "service_id", "tattoo_artist_id"] },
         include: [
            {
               model: Service,
               as: "services",
               attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
               model: User,
               as: "tattoo_artists",
               attributes: { exclude: ["createdAt", "updatedAt", "role_id", "email", "password"] },
            },
         ],
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
      const appointment = await Appointment.findByPk(appointmentId, {
         attributes: { exclude: ["createdAt", "updatedAt", "user_id", "service_id", "tattoo_artist_id"] },
         include: [
            {
               model: User,
               as: "user",
               attributes: { exclude: ["createdAt", "updatedAt", "role_id","password"] },
            },
            {
               model: Service,
               as: "services",
               attributes: { exclude: ["createdAt", "updatedAt"] },
           },
           {
            model: User,
            as: "tattoo_artists",
            attributes: { exclude: ["createdAt", "updatedAt", "role_id", "email","password"] },
            },
        ],
      });
      if (!appointment) {
         return res.status(404).json({
            success: true,
            message: "appointment not found",
            data: appointmentId
         });
      }

      res.status(200).json({
         success: true,
         message: "Appointment retreived successfully",
         data: appointment,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error retreinving appointment",
         error: error.message,
      });
   }
};

appointmentController.update = async (req, res) => {
   const { ...restAppointmentData } = req.body;
   const userId = req.tokenData.userId;
   try {
      const myAppointment = await Appointment.findOne({ where: { user_id: userId } });

      if (myAppointment === null) {
         return res.status(404).json({
            success: true,
            message: "No appointments",
         });
      }

      if (req.body && Object.keys(req.body).length === 0) {
         return res.status(404).json({
            success: true,
            message: "Invalid data",
         });
      }

      if (req.body.appointment_date && !dateValidator(req.body.appointment_date)) {
         return res.status(404).json({
            success: true,
            message: "Invalid date",
         });
      }
      const appointmentToUpdate = await Appointment.findByPk(myAppointment.id);

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

validateAppointment = async (user_id) => {
   const appointments = await Appointment.findOne({
      where: {
         user_id: user_id,
         appointment_date: {
            [Op.gt]: new Date() // Op.gt es el mayor que
         }
      }
   });

   return appointments != null;
};

module.exports = appointmentController;