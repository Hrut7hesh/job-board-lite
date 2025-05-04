import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
} from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(true);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const isValidEmail = (email) => {
    return email.includes("@") && email.includes(".");
  };

  const handleSubmitEmail = () => {
    if (!email || !isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    axios
      .get(`http://localhost:8080/api/applications?email=${email}`)
      .then((response) => {
        setApplications(response.data);
        setLoading(false);
        setOpenDialog(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to fetch applications. Please try again.");
        console.error(err);
      });
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSubmitEmail();
    }
  };

  return (
    <>
      <Navbar />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Enter your email</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            onKeyDown={handleEnterKey}
            required
          />
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitEmail} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          My Applications
        </Typography>

        {loading ? (
          <Typography variant="body1" mb={2}>
            Loading applications...
          </Typography>
        ) : applications.length === 0 ? (
          <Typography variant="body1" mb={2}>
            You have not applied for any jobs yet.
          </Typography>
        ) : (
          applications.map((application) => (
            <Paper key={application.id} sx={{ p: 3, mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ flex: 1, pr: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Job Title: {application.job.title}
                  </Typography>
                  <Typography>Company: {application.job.company}</Typography>
                  <Typography>Location: {application.job.location}</Typography>
                  <Typography>
                    Salary Range: {application.job.salaryRange}
                  </Typography>
                  <Typography color="textSecondary" sx={{ mt: 1 }}>
                    Description: {application.job.description}
                  </Typography>
                  <Typography color="textSecondary" sx={{ mt: 1 }}>
                    Skills: {application.job.requiredSkills.join(", ")}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    Applicant: {application.fullName} ({application.email})
                  </Typography>
                </Box>

                <Box>
                  <Avatar
                    src={`http://localhost:8080/logos/${application.job.logoPath}`}
                    alt={`${application.job.company} Logo`}
                    sx={{
                      width: 100,
                      height: 100,
                      border: "3px solid #275DF5",
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          ))
        )}
      </Container>
    </>
  );
};

export default MyApplications;
