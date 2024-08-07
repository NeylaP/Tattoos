const cors = require('cors');
const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./database/db");
const apiRoutes = require("./routes");

dotenv.config();

const app = express();
const corsOptions = {
   origin: '*',
   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
   preflightContinue: false,
   optionsSuccessStatus: 204,
   allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization"
 };

app.use(express.json());
app.use(cors(corsOptions));
 
const PORT = process.env.PORT || 4000;

app.get("/api/healthy", (req, res) => {
   res.status(200).json({
      success: true,
      message: "My APP server is healthy",
   });
});

// Register API routes
app.use("/api", apiRoutes);

sequelize
   .authenticate()
   .then(() => {
      console.log("🛢️  Database authenticated");

      // start the server
      app.listen(PORT, () => {
         console.log(`🚀 Server listening on port: ${PORT}`);
      });
   })
   .catch(() => {
      console.error("Error authenticating database");
   });
