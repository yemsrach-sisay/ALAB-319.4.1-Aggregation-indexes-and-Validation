const Grade = require("../models/grade");

// Get aggregated stats for all learners
exports.getStats = async (req, res) => {
  try {
    const stats = await Grade.aggregate([
      {
        $group: {
          _id: null,
          totalLearners: { $sum: 1 },
          above70: {
            $sum: {
              $cond: [{ $gt: ["$weighted_average", 70] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalLearners: 1,
          above70: 1,
          percentageAbove70: {
            $multiply: [{ $divide: ["$above70", "$totalLearners"] }, 100],
          },
        },
      },
    ]);

    res.status(200).json(stats[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get aggregated stats for learners in a specific class
exports.getClassStats = async (req, res) => {
  const classId = parseInt(req.params.id, 10);

  try {
    const stats = await Grade.aggregate([
      { $match: { class_id: classId } },
      {
        $group: {
          _id: null,
          totalLearners: { $sum: 1 },
          above70: {
            $sum: {
              $cond: [{ $gt: ["$weighted_average", 70] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalLearners: 1,
          above70: 1,
          percentageAbove70: {
            $multiply: [{ $divide: ["$above70", "$totalLearners"] }, 100],
          },
        },
      },
    ]);

    res.status(200).json(stats[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other CRUD operations (create, read, update, delete) would be implemented here
