const { User, Loan, Book, FavoriteBook } = require("../models");
const bcrypt = require("bcrypt");
const userController = {};

userController.getAll = async (req, res) => {
    try {
        console.log("entro aca");
        const users = await User.findAll({
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
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
    const userEmail = req.params.email;
    console.log(userEmail);
    try {
        const user = await User.findOne({
            where: {
                email: userEmail,
            },
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        });
        if (!user) {
            return res.status(404).json({
                success: true,
                message: "User not found",
            });
        }

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

module.exports = userController;