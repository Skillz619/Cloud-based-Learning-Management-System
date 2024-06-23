import React, { useEffect, useState } from 'react'
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Container, Typography, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import TableTemplateAssignment from "../../../components/TableTemplateAssignment";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
/* import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material'; */
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';


const ViewSubject = () => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error)
  }

  //page navigation handler 
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ]

  const studentRows = sclassStudents.map((student) => {
    return {
      rollNum: student.rollNum,
      name: student.name,
      id: student._id,
    };
  })




  /* adding assignment inputs */


  const [assignment, setAssignment] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [announcement, setAnnouncement] = useState([]);

  const apiCall = async()=>{

    
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/assignments/${subjectID}`);

    

    const data = await response.json();

    setAssignment(data);

  }


  const apiCallQuiz = async()=>{
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/quiz/${subjectID}`);
    const data = await response.json();
    setQuiz(data);
  }

  const apiCallAnnouncement = async()=>{
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/announcement/${subjectID}`);
    const data = await response.json();
    setAnnouncement(data);
  }

  useEffect(()=>{
    apiCall();
    apiCallQuiz();
    apiCallAnnouncement();
  },[]);


  
  const StudentsAttendanceButtonHaver = ({ row }) => {
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Teacher/class/student/" + row.id)}
        >
          View
        </BlueButton>
        <PurpleButton
          variant="contained"
          onClick={() =>
            navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`)
          }
        >
         Assign Grades
        </PurpleButton>
      </>
    );
  };

  const StudentsMarksButtonHaver = ({ row }) => {
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </BlueButton>
        <PurpleButton variant="contained"
          onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}>
          Mark Assignments
        </PurpleButton>
      </>
    );
  };



  const AssignmentsButtonHaver = ({ row }) => (
    <>
      <BlueButton variant="contained" onClick={() => navigate("/Admin/students/student/" + row.id)}>
        View
      </BlueButton>
      <PurpleButton variant="contained" onClick={() => navigate(`/Admin/subject/assignment/details/${row.id}/${subjectID}`)}>
        Assign Marks
      </PurpleButton>
    </>
  );

  const assignmentColumns = [
    { id: 'title', label: 'Assignment Title', minWidth: 170 },
    { id: 'dueDate', label: 'Due Date', minWidth: 100 },
    { id: 'totalGrade', label: 'Total Grade', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 200 },
    //{ id: 'assignMarks', label: 'Assign Marks', minWidth: 100, align: 'center', buttonHaver: AssignmentsButtonHaver },
  ];

  const assignmentRows =  assignment.length>0 ?assignment.map((a,index) => ({
    "title": a.title,
    "dueDate": a.deadline,
    "totalGrade": a.marks.toString(),
    "description": a.description,
    "id": a._id,
  })) : [];

  

  

  const quizColumns = [
    { id: 'title', label: 'Quiz Title', minWidth: 170 },
    { id: 'dueDate', label: 'Due Date', minWidth: 100 },
    { id: 'totalGrade', label: 'Total Grade', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 200 },
   // { id: 'assignMarks', label: 'Assign Marks', minWidth: 100, align: 'center', buttonHaver: QuizzesButtonHaver },
  ];

  const quizRows =  quiz.length>0 ? quiz.map((q) => ({
    title: q.title,
    dueDate: q.deadline,
    totalGrade: q.marks.toString(),
    description: q.description,
    id: q._id,
  })) : [];


  const announcementColumns = [
    { id: 'title', label: 'Announcement Title', minWidth: 170 },
    { id: 'dueDate', label: 'Date Posted', minWidth: 100 },
    
    { id: 'description', label: 'Description', minWidth: 200 },
    //{ id: 'assignMarks', label: 'Assign Marks', minWidth: 100, align: 'center', buttonHaver: AssignmentsButtonHaver },
  ];

  const announcementRows =  announcement.length>0 ? announcement.map((c) => ({
    title: c.title,
    dueDate: c.deadline,
   /*  totalGrade: q.marks.toString(), */
    description: c.description,
    id: c._id,
  })) : [];


  
  const SubjectAssignmentsSection = () => (
    
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Typography variant="h5">
          Assignments List:
        </Typography>
        <BlueButton
          variant="contained"
          onClick={() => navigate(`/Teacher/subject/assignment/${subjectID}`)}
        >
          Add Assignment
        </BlueButton>
      </Box>
      <TableTemplateAssignment columns={assignmentColumns} rows={assignmentRows} />
    </>
  );

  
  const SubjectQuizzesSection = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Typography variant="h5">
          Quizzes List:
        </Typography>
        <BlueButton
          variant="contained"
          onClick={() => navigate(`/Teacher/subject/quiz/${subjectID}`)}
        >
          Add Quiz
        </BlueButton>
      </Box>
      <TableTemplateAssignment columns={quizColumns} rows={quizRows} />
    </>
  );
  

  const SubjectAnnouncementsSection = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Typography variant="h5">
          Announcement List:
        </Typography>
        <BlueButton
          variant="contained"
          onClick={() => navigate(`/Teacher/subject/announcement/${subjectID}`)}
        >
          Add Announcement
        </BlueButton>
      </Box>
      <TableTemplateAssignment columns={announcementColumns} rows={announcementRows} />
    </>
  );





  const SubjectStudentsSection = () => {
    return (
      <>
        {getresponse ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <GreenButton
                variant="contained"
                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
              >
                Add Students
              </GreenButton>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Students List:
            </Typography>

            {selectedSection === 'attendance' &&
              <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns} rows={studentRows} />
            }
            {selectedSection === 'marks' &&
              <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns} rows={studentRows} />
            }

            {/* <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
              <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                <BottomNavigationAction
                  label="Quizzes"
                  value="attendance"
                  icon={selectedSection === 'attendance' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                />
                <BottomNavigationAction
                  label="Assignments"
                  value="marks"
                  icon={selectedSection === 'marks' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                />
              </BottomNavigation>
            </Paper> */}

          </>
        )}
      </>
    )
  }

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;
    const detailsColumns = [
      { id: 'detail', label: 'Detail', minWidth: 200 },
      { id: 'value', label: 'Value', minWidth: 300 },
    ];
  

    const detailsRows = [
      { detail: 'Course Name', value: subjectDetails && subjectDetails.subName },
      { detail: 'Course Code', value: subjectDetails && subjectDetails.subCode },
      { detail: 'Course Sessions', value: subjectDetails && subjectDetails.sessions },
      { detail: 'Number of Students', value: numberOfStudents },
      { detail: 'Class Name', value: subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName },
      {
        detail: 'Teacher Name',
        value: subjectDetails && subjectDetails.teacher ? (
          subjectDetails.teacher.name
        ) : (
          <GreenButton
            variant="contained"
            onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}
          >
            Add Subject Teacher
          </GreenButton>
        ),
      },
    ];
    
    return (
      <>
        <Typography variant="h4" align="center" gutterBottom>
          Subject Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Detail</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>{subjectDetails && subjectDetails.subName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Course Code</TableCell>
                <TableCell>{subjectDetails && subjectDetails.subCode}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Course Sessions</TableCell>
                <TableCell>{subjectDetails && subjectDetails.sessions}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Number of Students</TableCell>
                <TableCell>{numberOfStudents}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Class Name</TableCell>
                <TableCell>{subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Teacher Name</TableCell>
                <TableCell>
                  {subjectDetails && subjectDetails.teacher ? (
                    subjectDetails.teacher.name
                  ) : (
                    <GreenButton
                      variant="contained"
                      onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}
                    >
                      Add Subject Teacher
                    </GreenButton>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };
  
  return (
    <>
      {subloading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChange}
                  sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}
                >
                  <Tab label="Details" value="1" />
                  <Tab label="Students" value="2" />
                  <Tab label="Assignments" value="3" />
                  <Tab label="Quizzes" value="4" />
                  <Tab label="Announcements" value="5" />
                </TabList>
              </Box>
              <Container sx={{ marginTop: '3rem', marginBottom: '4rem' }}>
                <TabPanel value="1">
                  <SubjectDetailsSection />
                </TabPanel>
                <TabPanel value="2">
                  <SubjectStudentsSection />
                </TabPanel>
                <TabPanel value="3">
                  <SubjectAssignmentsSection />
                </TabPanel>
                <TabPanel value="4">
                  <SubjectQuizzesSection />
                </TabPanel>
                <TabPanel value="5">
                  <SubjectAnnouncementsSection />
                </TabPanel>

              </Container>
            </TabContext>
          </Box>
        </>
      )}
    </>
  );
  };
  
  export default ViewSubject;