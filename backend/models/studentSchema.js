const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNum: {
    type: Number,
    required: true,
  },
  password: {
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
    required: true,
  },
  role: {
    type: String,
    default: "Student",
  },
  subjects: [
    {
      subName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
      },
    },
  ],
  examResult: [
    {
      subName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
      },
      marksObtained: {
        type: Number,
        default: 0,
      },
      description: {
        type: String,
        default: "Assignment",
      },
    },
  ],
  attendance: [
    {
      date: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true,
      },
      subName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required: true,
      },
    },
  ],
  profile : {
    dateOfBirth: String,
    gender: String,
    email: String,
    phone: String,
    address: String,
    emergencyContact: String,
  }
});

module.exports = mongoose.model("student", studentSchema);
