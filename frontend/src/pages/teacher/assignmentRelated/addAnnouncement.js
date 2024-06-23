import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { setAnnouncement } from '../../../redux/sclassRelated/sclassHandle';
import Alert from '@mui/material/Alert';

import Popup from '../../../components/Popup';
import { BlueButton } from '../../../components/buttonStyles';
import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const AddAnnouncement = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams()
   
    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const subjects = [
        // ... your subjects data
      ];
    const [name, setName] = useState("");
    const [totalMarks, setTotalMarks] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const [success, setSuccess] = useState(false);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
 
    useEffect(() => {
    
        if (situation === "Student") {
            setStudentID(params.id);
            const stdID = params.id
            dispatch(getUserDetails(stdID, "Student"));
        }
        else if (situation === "Subject") {
            const { studentID, subjectID } = params
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }else if(situation === "Teacher"){
            const subjectId = params.id;
            console.log("subjectid ",subjectId);

            setChosenSubName(subjectId);

        }
    }, [situation]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    }

    const fields = {announcements: { type: 0, title: name, description: description, marks: totalMarks, deadline: dueDate, postedOn: formattedDate  }}

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        console.log("choosen sbject name : ",chosenSubName)
        
        dispatch(setAnnouncement(chosenSubName, fields, "SetAnnouncement"));
        setLoader(false)
        setSuccess(true);
       

    }

    useEffect(() => {
        if (response) {
            setLoader(false)
            setShowPopup(true)
            setMessage(response)
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("error")
        }
        else if (statestatus === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
    }, [response, statestatus, error])

    return (
        <>
            {loading
                ?
                <>
                    <div>Loading...</div>
                </>
                :
                <>
                    <Box
                        sx={{
                            flex: '1 1 auto',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        
                        <Box
                            sx={{
                                maxWidth: 550,
                                px: 3,
                                py: '100px',
                                width: '100%'
                            }}
                        >
                            
                            <Typography variant="h4" component="h2" gutterBottom>
                            Post an Announcement
                            </Typography>
                            <form onSubmit={submitHandler}>
                                <Stack spacing={3}>
                                    <FormControl>
                                        <TextField type="" label='Announcement Title'
                                            value={name} required
                                            onChange={(e) => setName(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                    
    
                                    <FormControl>
                                    <TextField
                                     id="date"
                                    label="Date Posted"
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    InputLabelProps={{
                                     shrink: true,
                                         }}
                                     />
                                    </FormControl>
                                    <FormControl>
                                        <TextField
                                                value={description} required
                                                onChange={(e) => setDescription(e.target.value)}
                                                id="outlined-multiline-static"
                                                label="Description"
                                                multiline
                                                rows={4}
                                                defaultValue="Default Value"
                                            />
                                    </FormControl>
                                </Stack>
                                <BlueButton
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 3 }}
                                    variant="contained"
                                    type="submit"
                                    disabled={loader}
                                >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Post Announcement"}
                                </BlueButton>
                            </form>
                            {success ? <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Announcement has been posted sucessfully
    </Alert>:""}
                        </Box>
                    </Box>
                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </>
            }
        </>
    );
}

export default AddAnnouncement