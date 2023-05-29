const mongoose = require("mongoose");

const userReportModel = mongoose.Schema(
  {
    complainant: { type: String, required: true },
    offender: { type: String, required: true },
    text: {
      type: String,
      trim: true,
      required: [true, "Please add a text value"],
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

const userReport = mongoose.model("userReport", userReportModel);

module.exports = userReport;
