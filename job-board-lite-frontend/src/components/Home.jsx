import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
  Avatar,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/jobs")
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.id - a.id);
        setJobs(sorted.slice(0, 3));
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
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" fontWeight="bold" mb={2} color="#000">
            Welcome to JobBoard Lite 👋
          </Typography>
          <Typography
            variant="h6"
            sx={{ maxWidth: 800, mx: "auto", fontSize: "1.1rem" }}
          >
            Your next career opportunity is just a click away. Browse through
            top jobs, apply directly, and take your career to the next level
            with ease. Start your journey now!
          </Typography>
        </Box>

        <Typography
          variant="h5"
          fontWeight="bold"
          color="#000"
          textAlign="center"
          mb={1}
        >
          Latest Jobs 📢
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={10}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card
                elevation={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "white",
                  transition: "transform 0.2s",
                  height: "100%",
                  "&:hover": {
                    transform: "scale(1.02)",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleViewDetails(job.id)}
              >
                <Box sx={{ flex: 1 }}>
                  <CardContent sx={{ pb: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.company} – {job.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {job.description.length > 25
                        ? `${job.description.substring(0, 25)}...`
                        : job.description}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "#275DF5",
                        color: "#fff",
                        "&:hover": { backgroundColor: "#0d47a1" },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(job.id);
                      }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Box>

                {job.logoPath && (
                  <Avatar
                    src={`http://localhost:8080/logos/${job.logoPath}`}
                    alt={`${job.company} Logo`}
                    sx={{
                      width: 48,
                      height: 48,
                      border: `2px solid ${theme.palette.primary.main}`,
                    }}
                  />
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
