import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AllJobs from "./components/AllJobs";
import SearchResults from "./components/SearchResults";
import JobDetails from "./components/JobDetails";
import ApplyForm from "./components/ApplyForm";
import ApplicationSuccess from "./components/ApplicationSuccess";
import MyApplications from "./components/MyApplications"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<AllJobs />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/apply/:id" element={<ApplyForm />} />
        <Route path="/application-success" element={<ApplicationSuccess />} />
        <Route path="/my-applications" element={<MyApplications />} />
      </Routes>
    </Router>
  );
}

export default App;
