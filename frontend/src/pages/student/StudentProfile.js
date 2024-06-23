import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudentProfile , getStudentProfile} from '../../redux/studentRelated/studentHandle';

const StudentProfile = () => {
  const dispatch = useDispatch();
  const { currentUser, response, error , studentList } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    dateOfBirth: currentUser.dateOfBirth || '',
    gender: currentUser.gender || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    address: currentUser.address || '',
    emergencyContact: currentUser.emergencyContact || '',
  });

  useEffect(() => {
    dispatch(getStudentProfile(currentUser._id));
  }, []); // Empty dependency array ensures this effect runs only once on mount


  useEffect(() => {
    setEditedInfo({
      dateOfBirth: currentUser.dateOfBirth || '',
      gender: currentUser.gender || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      address: currentUser.address || '',
      emergencyContact: currentUser.emergencyContact || '',
    });
  }, [currentUser]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Here, you can update the user's information in your state or database
    dispatch(updateStudentProfile(currentUser._id, editedInfo));
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo(prevEditedInfo => ({
      ...prevEditedInfo,
      [name]: value
    }));
  };

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                  {String(currentUser.name).charAt(0)}
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h5" component="h2" textAlign="center">
                  {currentUser.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  Student Roll No: {currentUser.rollNum}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  Class: {sclassName.sclassName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  School: {studentSchool.schoolName}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              {!editMode && <Button variant="contained" onClick={handleEditClick}>Edit</Button>}
            </Box>
            {editMode ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="dateOfBirth"
                    label="Date of Birth"
                    value={editedInfo.dateOfBirth}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="gender"
                    label="Gender"
                    value={editedInfo.gender}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    label="Email"
                    value={editedInfo.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="phone"
                    label="Phone"
                    value={editedInfo.phone}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address"
                    label="Address"
                    value={editedInfo.address}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="emergencyContact"
                    label="Emergency Contact"
                    value={editedInfo.emergencyContact}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleSaveClick} disabled={!editedInfo.dateOfBirth || !editedInfo.gender || !editedInfo.email || !editedInfo.phone || !editedInfo.address || !editedInfo.emergencyContact}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Date of Birth:</strong> {editedInfo.dateOfBirth}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Gender:</strong> {editedInfo.gender}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Email:</strong> {editedInfo.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Phone:</strong> {editedInfo.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Address:</strong> {editedInfo.address}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Emergency Contact:</strong> {editedInfo.emergencyContact}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default StudentProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;