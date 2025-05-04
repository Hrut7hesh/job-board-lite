import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const SearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("role") || "";

  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);
    axios
      .get("http://localhost:8080/api/jobs")
      .then((res) => {
        const results = res.data.filter((job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setJobs(results);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  const handleViewDetails = (id) => {
    navigate(`/jobs/${id}`);
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={1}>
          Search Results for "{searchTerm}"
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {loading ? (
          <Typography textAlign="center">Loading...</Typography>
        ) : jobs.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No jobs found for "{searchTerm}" 😞
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

export default SearchResults;
