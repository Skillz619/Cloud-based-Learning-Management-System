const router = require("express").Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail } = require("../controllers/admin-controller.js");

const {
  sclassCreate,
  sclassList,
  deleteSclass,
  deleteSclasses,
  getSclassDetail,
  getSclassStudents,
  getSclassStudentsViaSubject,
} = require("../controllers/class-controller.js");
const { complainCreate, complainList } = require("../controllers/complain-controller.js");
const {
  noticeCreate,
  noticeList,
  deleteNotices,
  deleteNotice,
  updateNotice,
} = require("../controllers/notice-controller.js");
const {
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
  getStudentProfile,
} = require("../controllers/student_controller.js");
const {
  subjectCreate,
  classSubjects,
  deleteSubjectsByClass,
  getSubjectDetail,
  deleteSubject,
  freeSubjectList,
  allSubjects,
  allSubjectsByTeachers,
  deleteSubjects,
  setAnnouncement,
  setSyallabus,
  subjectByStudent,
} = require("../controllers/subject-controller.js");
const {
  teacherRegister,
  teacherLogIn,
  getTeachers,
  getTeacherDetail,
  getTeachersByClass,
  deleteTeachers,
  deleteTeachersByClass,
  deleteTeacher,
  updateTeacherSubject,
  teacherAttendance,
  fetchAssignments,
  fetchAnnouncement,
  fetchQuiz,
} = require("../controllers/teacher-controller.js");

// Admin
router.post("/AdminReg", adminRegister);
router.post("/AdminLogin", adminLogIn);

router.get("/Admin/:id", getAdminDetail);
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post("/StudentReg", studentRegister);
router.post("/StudentLogin", studentLogIn);

router.get("/Students/:id", getStudents);
router.get("/Student/:id", getStudentDetail);

router.delete("/Students/:id", deleteStudents);
router.delete("/StudentsClass/:id", deleteStudentsByClass);
router.delete("/Student/:id", deleteStudent);

router.put("/Student/:id", updateStudent);

router.put("/UpdateExamResult/:id", updateExamResult);
router.put("/studentProfile/:id", getStudentProfile);

router.put("/StudentSubject/:id", studentSubject);

router.put("/RemoveAllStudentsSubAtten/:id", clearAllStudentsSubjectBySubject);
router.put("/RemoveAllStudentsAtten/:id", clearAllStudentsSubject);

router.put("/RemoveStudentSub/:id", removeStudentSubjectBySubject);
router.put("/RemoveStudentAtten/:id", removeStudentSubject);

router.put('/updateStudentInfo/:id', updateUserInfo);

// Teacher

router.post("/TeacherReg", teacherRegister);
router.post("/TeacherLogin", teacherLogIn);

router.get("/Teachers/:id", getTeachers);
router.get("/SemesterTeachers/:id", getTeachersByClass);
router.get("/Teacher/:id", getTeacherDetail);

router.delete("/Teachers/:id", deleteTeachers);
router.delete("/TeachersClass/:id", deleteTeachersByClass);
router.delete("/Teacher/:id", deleteTeacher);

router.put("/TeacherSubject", updateTeacherSubject);

router.post("/TeacherAttendance/:id", teacherAttendance);



router.get("/assignments/:id", fetchAssignments);
router.get("/quiz/:id", fetchQuiz);
router.get("/announcement/:id", fetchAnnouncement);

// Notice

router.post("/NoticeCreate", noticeCreate);

router.get("/NoticeList/:id", noticeList);

router.delete("/Notices/:id", deleteNotices);
router.delete("/Notice/:id", deleteNotice);

router.put("/Notice/:id", updateNotice);

// Complain

router.post("/ComplainCreate", complainCreate);

router.get("/ComplainList/:id", complainList);

// Sclass

router.post("/SclassCreate", sclassCreate);

router.get("/SclassList/:id", sclassList);
router.get("/Sclass/:id", getSclassDetail);

router.get("/Sclass/Students/:id", getSclassStudents);
router.get("/Sclass/Students/:id/Subject/:id", getSclassStudentsViaSubject);

router.delete("/Sclasses/:id", deleteSclasses);
router.delete("/Sclass/:id", deleteSclass);

// Subject

router.post("/SubjectCreate", subjectCreate);
router.post("/SetSyallabus/:id", setSyallabus);
router.post("/SetAnnouncement/:id", setAnnouncement);

router.get("/AllSubjects/:id", allSubjects);
router.get("/AllSubjects/teachers/:id", allSubjectsByTeachers);
router.get("/ClassSubjects/:id", classSubjects);
router.get("/StudentSubjects/:id", subjectByStudent);
router.get("/FreeSubjectList/:id", freeSubjectList);
router.get("/Subject/:id", getSubjectDetail);

router.delete("/Subject/:id", deleteSubject);
router.delete("/Subjects/:id", deleteSubjects);
router.delete("/SubjectsClass/:id", deleteSubjectsByClass);

router.get("/", (req, res) => {
  return res.json({ msg: "serving" });
});

module.exports = router;
