import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassDetails, getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { Paper, BottomNavigation, BottomNavigationAction, Container, Table, TableBody, Typography, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CustomBarChart from '../../components/CustomBarChart';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import InfoIcon from '@mui/icons-material/Info';
import { Grid, Button } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import TableTemplateAssignment from "../../components/TableTemplateAssignment"; // Import the table component


const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }, [dispatch, currentUser._id, currentUser.sclassName._id]);

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('details');

    useEffect(() => {
        if (userDetails && userDetails.examResult) {
            setSubjectMarks(userDetails.examResult);
        }
    }, [userDetails]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const [quiz, setQuiz]= useState([]);
    const [assignment, setAssignment]= useState([]);
    const [announcement, setAnnouncement]= useState([]);

    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedSubjectId, setSelectedSubjectId] = useState('');
    const [totalGrade, setTotalGrade] = useState(0);

    // Function to calculate total grade
    const calculateTotalGrade = () => {
        const totalAssignmentsGrade = assignment
            .filter(assignment => assignment.subjectCode === selectedSubject)
            .reduce((total, assignment) => total + assignment.totalGrade, 0);
    
        const totalQuizzesGrade = quiz
            .filter(quiz => quiz.subjectCode === selectedSubject)
            .reduce((total, quiz) => total + quiz.totalGrade, 0);
    
        setTotalGrade(totalAssignmentsGrade + totalQuizzesGrade);
    }; 



    const quizColumns = [
        { id: 'title', label: 'Quiz Title', minWidth: 170 },
        { id: 'totalGrade', label: 'Total Grade', minWidth: 100 },
        { id: 'dueDate', label: 'Due Date', minWidth: 100 },
        { id: 'description', label: 'Description', minWidth: 200 },
    ];

    const assignmentColumns = [
        { id: 'title', label: 'Assignment Title', minWidth: 170 },
        { id: 'totalGrade', label: 'Total Grade', minWidth: 100 },
        { id: 'dueDate', label: 'Due Date', minWidth: 100 },
        { id: 'description', label: 'Description', minWidth: 200 },
    ];

    const quizRows = quiz.length>0 ? quiz.map(quiz => ({
        title: quiz.title,
        totalGrade: quiz.marks.toString(),
        dueDate: quiz.deadline,
        description: quiz.description, // Example description
    })) :[];

    const assignmentRows = assignment.length >0 ? assignment.map(assignment => ({
        title: assignment.title,
        totalGrade: assignment.marks.toString(),
        dueDate: assignment.deadline,
        description: assignment.description, // Example description
    })) : [];

    const announcementColumns = [
        { id: 'title', label: 'Announcement Title', minWidth: 170 },
        { id: 'dueDate', label: 'Date Posted', minWidth: 100 },
        { id: 'description', label: 'Description', minWidth: 200 },
    ];

    const announcementRows = announcement.map(c => ({
            title: c.title,
            dueDate: c.deadline,
            description: c.description,
            id: c._id,
        }));

        
    //fetch 
  


    /* const renderTableSection = () => (
        <Table>
            <TableHead>
                <StyledTableRow>
                    <StyledTableCell>Subject</StyledTableCell>
                    <StyledTableCell>Marks</StyledTableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>
                {subjectMarks.map((result, index) => (
                    result.subName && result.marksObtained && (
                        <StyledTableRow key={index}>
                            <StyledTableCell>{result.subName.subName}</StyledTableCell>
                            <StyledTableCell>{result.marksObtained}</StyledTableCell>
                        </StyledTableRow>
                    )
                ))}
            </TableBody>
        </Table>
    ); */


    
    const renderAnnouncementsSection = () => (
        <Container>
            <FormControl fullWidth style={{ margin: '20px 0' }}>
            <InputLabel id="select-subject-label">Choose Course</InputLabel>
            <Select
                labelId="select-subject-label"
                id="select-subject"
                value={selectedSubject}
                label="Choose Course"
                onChange={onSubjectChange}
            >
                {subjectsList.map((subject, index) => (
                    <MenuItem key={index} value={subject._id}>
                        {subject.subName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TableTemplateAssignment
                columns={announcementColumns}
                rows={announcementRows}
              />
            </Grid>
          </Grid>
        </Container>
      );




const renderGradesSection = () => {
    return (
        subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 && (
            <>
            <Table >
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Course</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>

                        <StyledTableCell>Earned Grades</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {subjectMarks.map((result, index) => {
                        // if (result.subName.subName === teachSubject) {
                        return (
                            <StyledTableRow>
                                <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                <StyledTableCell>{result.description}</StyledTableCell>
                                <StyledTableCell>{result.marksObtained}</StyledTableCell>
                            </StyledTableRow>

                        )
                        // }
                        // else if (!result.subName || !result.marksObtained) {
                        //     return null;
                        // }
                        // return null
                    })}
                </TableBody>
            </Table>

        </> 
        ) 
    )
}


    const renderChartSection = () => (
        <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
    );
/* Details Tab  */
const renderClassDetailsSection = () => (
    <Container>
        <Typography variant="h5" align="center"> .</Typography>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="class details table">
                <TableHead>
                    <TableRow>
                        <TableCell>Semester Name</TableCell>
                        <TableCell>Course Name</TableCell>
                        <TableCell>Course Code</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subjectsList.map((subject, index) => (
                        <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            Fall 2024
                            </TableCell>
                            <TableCell>{subject.subName}</TableCell>
                            <TableCell>{subject.subCode}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
);



const onSubjectChange = async(event) => {

    setSelectedSubject(event.target.value);
     await apiCallAssignment(event.target.value);
    

     await apiCallQuiz(event.target.value);

     await apiCallAnnouncement(event.target.value);
    


}


const apiCallAssignment = async(subId) => {
    console.log(subId)
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/assignments/${subId}`);

    const data = await response.json();

    console.log("assignment",data);

    setAssignment(data);
}

const apiCallQuiz = async(subId) => {
    
    console.log(subId)
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/quiz/${subId}`);
    const data = await response.json();
    console.log("quiz",data);
    setQuiz(data);

}

const apiCallAnnouncement = async(subId) => {
    
    console.log(subId)
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/announcement/${subId}`);
    const data = await response.json();
    console.log("announcement",data);
    setAnnouncement(data);

}


/* Assignments and Quizzes  */
const renderAssignmentsAndQuizzesSection = () => (
    <Container>
        <FormControl fullWidth style={{ margin: '20px 0' }}>
            <InputLabel id="select-subject-label">Choose Course</InputLabel>
            <Select
                labelId="select-subject-label"
                id="select-subject"
                value={selectedSubject}
                label="Choose Course"
                onChange={onSubjectChange}
            >
                {subjectsList.map((subject, index) => (
                    <MenuItem key={index} value={subject._id}>
                        {subject.subName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <TableTemplateAssignment columns={assignmentColumns} rows={assignmentRows} />
            </Grid>
            <Grid item xs={6}>
                <TableTemplateAssignment columns={quizColumns} rows={quizRows} />
            </Grid>
        </Grid>

        {/* <Button variant="contained" color="primary" onClick={calculateTotalGrade}>
            View Grade
        </Button>
        <Typography variant="h6" component="h2">
            Total Grade: {totalGrade}
        </Typography> */}
    </Container>
);



/* Announcements */

return (
    <div>
        {loading ? (
            <Typography>Loading...</Typography>
        ) : (
            <>
                <Paper elevation={3}>
                    <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                        <BottomNavigationAction
                            label="Details"
                            value="details"
                        />
                        <BottomNavigationAction
                            label="Quizzes & Assignments"
                            value="Quizzes/Assignments"
                        />
                        <BottomNavigationAction
                            label="Announcements"
                            value="Announcements"
                        />
                            <BottomNavigationAction
                            label="Grades"
                            value="Grades"
                        />


                    </BottomNavigation>
                    
                </Paper>
                {selectedSection === 'Announcements' && renderAnnouncementsSection()}
                {selectedSection === 'Grades' && renderGradesSection()}
                {selectedSection === 'Quizzes/Assignments' && renderAssignmentsAndQuizzesSection()}
                {selectedSection === 'details' && renderClassDetailsSection()}
            </>
        )}
    </div>
);
};

export default StudentSubjects;