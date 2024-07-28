const mongoose = require("mongoose");
const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    tags: {
      type: [String], // Array of strings to store tags
      default: [], // Default to an empty array
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
