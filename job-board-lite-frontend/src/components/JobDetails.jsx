import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Chip,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SchoolIcon from "@mui/icons-material/School";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!job) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 6, mb:6 }}>
          <Typography variant="h6" textAlign="center">
            No Details Found...
          </Typography>
        </Container>
      </>
    );
  }

  const handleApplyClick = () => {
    navigate(`/apply/${id}`);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 6, mb:6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Typography variant="h4" fontWeight="bold" mb={2}>
                {job.title}
              </Typography>

              <Typography variant="h6" color="text.secondary" mb={1}>
                {job.company} – {job.location}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.7,
                  fontSize: "1.05rem",
                }}
              >
                {job.description}
              </Typography>

              <Box mt={4}>
                <Typography variant="subtitle1" fontWeight={600}>
                  <AttachMoneyIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  Salary Range:
                </Typography>
                <Typography variant="body1" mb={2}>
                  {job.salaryRange}
                </Typography>

                <Typography variant="subtitle1" fontWeight={600}>
                  <SchoolIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  Required Skills:
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                  {job.requiredSkills?.map((skill, idx) => (
                    <Chip key={idx} label={skill} color="primary" />
                  ))}
                </Box>

                <Typography variant="subtitle1" fontWeight={600} mt={2}>
                  <LocationOnIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  Location:
                </Typography>
                <Typography variant="body1" mb={2}>
                  {job.location}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "transparent",
                  position: "absolute",
                  right: 50,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {job.logoPath && (
                  <Grid item>
                    <Avatar
                      src={`http://localhost:8080/logos/${job.logoPath}`}
                      alt={`${job.company} Logo`}
                      sx={{
                        width: 120,
                        height: 120,
                        border: "3px solid #275DF5",
                      }}
                    />
                  </Grid>
                )}
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#275DF5",
                      color: "#fff",
                      px: 5,
                      py: 1.5,
                      "&:hover": { backgroundColor: "#0d47a1" },
                      fontWeight: 600,
                      fontSize: "1.1rem",
                    }}
                    onClick={handleApplyClick}
                  >
                    Apply Now
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default JobDetails;
