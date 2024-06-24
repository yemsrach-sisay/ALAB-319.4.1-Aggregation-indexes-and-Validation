const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const gradesRoutes = require("./routes/grades");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/grades", gradesRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/gradesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
