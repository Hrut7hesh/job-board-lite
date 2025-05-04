import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/jobs")
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.id - a.id);
        setJobs(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/jobs/${id}`);
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={1}>
          All Available Jobs 🧭
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {jobs.length === 0 ? (
          <Typography variant="body1">
            No jobs available at the moment.
          </Typography>
        ) : (
          jobs.map((job) => (
            <Paper
              key={job.id}
              sx={{
                p: 3,
                mb: 3,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.01)", boxShadow: 4 },
              }}
              onClick={() => handleViewDetails(job.id)}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ flex: 1, pr: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {job.title}
                  </Typography>
                  <Typography>Company: {job.company}</Typography>
                  <Typography>Location: {job.location}</Typography>
                  <Typography color="textSecondary" sx={{ mt: 1 }}>
                    Description:{" "}
                    {job.description.length > 80
                      ? `${job.description.substring(0, 80)}...`
                      : job.description}
                  </Typography>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      mt: 2,
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#1565c0" },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(job.id);
                    }}
                  >
                    View Details
                  </Button>
                </Box>

                {job.logoPath && (
                  <Box>
                    <Avatar
                      src={`http://localhost:8080/logos/${job.logoPath}`}
                      alt={`${job.company} logo`}
                      sx={{
                        width: 80,
                        height: 80,
                        border: "2px solid #1976d2",
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Paper>
          ))
        )}
      </Container>
    </>
  );
};

export default AllJobs;
