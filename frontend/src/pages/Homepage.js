import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, AppBar, Toolbar, Typography } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';



const Homepage = () => {
    return (
        <>
            <AppBar position="static" style={{ backgroundColor: '#fdb71a' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        SJSU LMS
                    </Typography>
                </Toolbar>
            </AppBar>
            <StyledContainer>
                <Grid container spacing={0} >
                    <Grid item xs={12} md={6}>
                        <img src='https://www.sjsu.edu/online/pics/sjsu-online-logo.svg' alt="students" style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StyledPaper elevation={3}>
                            <StyledTitle>
                                Welcome to
                                <br />
                                Learning
                                <br />
                                management
                                <br />
                                System
                            </StyledTitle>
                            <StyledText>
                                Streamline university management, course registration, and add students and faculty.
                                Access records, view marks, and communicate effortlessly.
                            </StyledText>
                            <StyledBox>
                                <StyledLink to="/choose">
                                    <LightPurpleButton variant="contained" fullWidth>
                                        Login
                                    </LightPurpleButton>
                                </StyledLink>
                            </StyledBox>
                        </StyledPaper>
                    </Grid>
                </Grid>
            </StyledContainer>
        </>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding: 24px;
  backgroundColor:'#fdb71a'
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  backgroundColor:'#fdb71a'
`;
