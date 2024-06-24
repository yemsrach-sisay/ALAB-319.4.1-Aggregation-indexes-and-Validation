const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gradeSchema = new Schema(
  {
    learner_id: { type: Number, required: true, min: 0 },
    class_id: { type: Number, required: true, min: 0, max: 300 },
    weighted_average: { type: Number, required: true },
    // other fields...
  },
  {
    validationAction: "warn",
  }
);

// Create indexes
gradeSchema.index({ class_id: 1 });
gradeSchema.index({ learner_id: 1 });
gradeSchema.index({ learner_id: 1, class_id: 1 });

module.exports = mongoose.model("Grade", gradeSchema);
