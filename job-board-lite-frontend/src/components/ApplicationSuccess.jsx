import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ApplicationSuccess = () => {
  const navigate = useNavigate();

  const handleBackToJobs = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Application Submitted Successfully!
        </Typography>
        <Typography variant="body1" mb={2}>
          Thank you for applying! We will review your application and get back to you soon.
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#275DF5", color: "#fff" }}
          onClick={handleBackToJobs}
        >
          Back to Jobs
        </Button>
      </Container>
    </>
  );
};

export default ApplicationSuccess;
