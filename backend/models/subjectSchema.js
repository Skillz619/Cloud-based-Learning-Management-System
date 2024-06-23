const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subjectStatus: {
      type: String,
      required: true,
      default: "published",
    },
    subName: {
      type: String,
      required: true,
    },
    subCode: {
      type: String,
      required: true,
    },
    sessions: {
      type: String,
      required: true,
    },
    sclassName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sclass",
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
    },
    syllabus: {
      type: String,
      default: "",
    },
    announcements: [
      {
        type: {
          type: String,
          default: "",
        },
        title: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
        marks: {
          type: Number,
          default: 0,
        },
        deadline: {
          type: String,
          default: "",
        },
        postedOn: {
          type: String,
          default: "",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("subject", subjectSchema);
