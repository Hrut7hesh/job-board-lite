import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ApplyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    job: { id },
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.fullName || !formData.email) {
      setError("Please fill out all the fields.");
      setLoading(false);
      return;
    }

    axios
      .post("http://localhost:8080/api/applications", formData)
      .then((response) => {
        setLoading(false);
        navigate(`/application-success`);
      })
      .catch((err) => {
        setLoading(false);

        if (err.response && err.response.data) {
          const errorMessage = err.response.data.message.replace("Invalid Application: ", "");
          setError(errorMessage || "An error occurred. Please try again.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }

        console.error(err);
      });
  };

  const handleApplyLater = () => {
    navigate(`/jobs`);
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Apply for Job
        </Typography>

        {error && (
          <Typography color="error" variant="body1" mb={2}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full Name"
              variant="outlined"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  backgroundColor: "#275DF5",
                  color: "#fff",
                  fontWeight: 600,
                  px: 5,
                  py: 1.5,
                  "&:hover": { backgroundColor: "#0d47a1" },
                }}
              >
                {loading ? "Submitting..." : "Apply Now"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleApplyLater}
                sx={{
                  color: "#275DF5",
                  borderColor: "#275DF5",
                  fontWeight: 600,
                  px: 5,
                  py: 1.5,
                  "&:hover": { borderColor: "#0d47a1", color: "#0d47a1" },
                }}
              >
                Apply Later
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default ApplyForm;
