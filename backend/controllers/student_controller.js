const bcrypt = require("bcrypt");
const Student = require("../models/studentSchema.js");
const Subject = require("../models/subjectSchema.js");

const studentRegister = async (req, res) => {
  try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      const existingStudent = await Student.findOne({
          rollNum: req.body.rollNum,
          school: req.body.adminID,
          sclassName: req.body.sclassName,
      });

      if (existingStudent) {
          res.send({ message: 'Roll Number already exists' });
      }
      else {
          const student = new Student({
              ...req.body,
              school: req.body.adminID,
              password: hashedPass
          });

          let result = await student.save();

          result.password = undefined;
          res.send(result);
      }
  } catch (err) {
      res.status(500).json(err);
  }
};


const studentLogIn = async (req, res) => {
  try {
    let student = await Student.findOne({ rollNum: req.body.rollNum, name: req.body.studentName });
    if (student) {
      const validated = await bcrypt.compare(req.body.password, student.password);
      if (validated) {
        student = await student.populate("school", "schoolName");
        student = await student.populate("sclassName", "sclassName");
        student.password = undefined;
        student.examResult = undefined;
        student.Subject = undefined;
        res.send(student);
      } else {
        res.send({ message: "Invalid password" });
      }
    } else {
      res.send({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getStudents = async (req, res) => {
  try {
    let students = await Student.find({ school: req.params.id }).populate(
      "sclassName",
      "sclassName"
    );
    if (students.length > 0) {
      let modifiedStudents = students.map((student) => {
        return { ...student._doc, password: undefined };
      });
      res.send(modifiedStudents);
    } else {
      res.send({ message: "No students found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getStudentDetail = async (req, res) => {
  try {
    let student = await Student.findById(req.params.id)
      .populate("school", "schoolName")
      .populate("sclassName", "sclassName")
      .populate("examResult.subName", "subName")
      .populate({
        path: "subjects.subName",
        populate: {
          path: "sclassName",
          select: "sclassName",
        },
        select: "subName subCode sclassName teacher",
      })
      .populate({
        path: "subjects.subName",
        populate: {
          path: "teacher",
          select: "name",
        },
      });
    if (student) {
      student.password = undefined;
      res.send(student);
    } else {
      res.send({ message: "No student found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).json(err);
  }
};

const deleteStudents = async (req, res) => {
  try {
    const result = await Student.deleteMany({ school: req.params.id });
    if (result.deletedCount === 0) {
      res.send({ message: "No students found to delete" });
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

const deleteStudentsByClass = async (req, res) => {
  try {
    const result = await Student.deleteMany({ sclassName: req.params.id });
    if (result.deletedCount === 0) {
      res.send({ message: "No students found to delete" });
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

const updateStudent = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      res.body.password = await bcrypt.hash(res.body.password, salt);
    }
    let result = await Student.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    result.password = undefined;
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateExamResult = async (req, res) => {
  const { subName, marksObtained, description } = req.body;

  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.send({ message: "Student not found" });
    }

    const existingResult = student.examResult.find(
      (result) => result.description.toString() === description
    );

    if (existingResult) {
      existingResult.marksObtained = marksObtained;
    } else {
      student.examResult.push({ subName, marksObtained, description });
    }

    const result = await student.save();
    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const studentSubject = async (req, res) => {
  // const { subName, status, date } = req.body;
  const { subName } = req.body;

  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.send({ message: "Student not found" });
    }

    const subject = await Subject.findById(subName);

    // const existingSubject = student.Subject.find(
    //   (a) =>
    //     a.date.toDateString() === new Date(date).toDateString() && a.subName.toString() === subName
    // );

    // if (existingSubject) {
    //   existingSubject.status = status;
    // } else {
    //   // Check if the student has already attended the maximum number of sessions
    //   const attendedSessions = student.Subject.filter(
    //     (a) => a.subName.toString() === subName
    //   ).length;

    //   if (attendedSessions >= subject.sessions) {
    //     return res.send({ message: "Maximum Subject limit reached" });
    //   }

    student.subjects.push({ subName });
    // }

    const result = await student.save();
    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const clearAllStudentsSubjectBySubject = async (req, res) => {
  const subName = req.params.id;

  try {
    const result = await Student.updateMany(
      { "subjects.subName": subName },
      { $pull: { subjects: { subName } } }
    );
    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const clearAllStudentsSubject = async (req, res) => {
  const schoolId = req.params.id;

  try {
    const result = await Student.updateMany({ school: schoolId }, { $set: { subjects: [] } });

    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeStudentSubjectBySubject = async (req, res) => {
  const studentId = req.params.id;
  const subName = req.body.subId;

  try {
    const result = await Student.updateOne(
      { _id: studentId },
      { $pull: { subjects: { subName: subName } } }
    );

    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeStudentSubject = async (req, res) => {
  const studentId = req.params.id;

  try {
    const result = await Student.updateOne({ _id: studentId }, { $set: { subjects: [] } });

    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUserInfo = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedStudent = await Student.findById(id);
    if (!updatedStudent) {
      return res.send({ message: 'Student not found' });
    }
    
    updatedStudent.profile = req.body;
    await updatedStudent.save();

    res.json(updatedStudent);
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).send('Server Error');
  }
};

const getStudentProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    if (!updatedStudent) {
      return res.send({ message: 'Student not found' });
    }

    res.json(student.profile);
  } catch (error) {
    console.error('Error updating user informationw:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  studentRegister,
  studentLogIn,
  getStudents,
  getStudentDetail,
  deleteStudents,
  deleteStudent,
  updateStudent,
  studentSubject,
  deleteStudentsByClass,
  updateExamResult,

  clearAllStudentsSubjectBySubject,
  clearAllStudentsSubject,
  removeStudentSubjectBySubject,
  removeStudentSubject,
  updateUserInfo,
  getStudentProfile
};
