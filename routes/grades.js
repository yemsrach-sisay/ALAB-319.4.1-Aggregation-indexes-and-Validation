const express = require("express");
const router = express.Router();
const GradesController = require("../controllers/gradesController");

// Define the new routes
router.get("/stats", GradesController.getStats);
router.get("/stats/:id", GradesController.getClassStats);

// Define other CRUD routes here...

module.exports = router;
