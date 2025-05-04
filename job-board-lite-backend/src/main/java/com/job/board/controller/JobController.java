package com.job.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.job.board.dvo.Job;
import com.job.board.service.JobService;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Job>> searchJobsByRole(@RequestParam("role") String role) {
        List<Job> jobs = jobService.searchJobsByTitle(role);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        Job job = jobService.getJobById(id);
        return ResponseEntity.ok(job);
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        Job savedJob = jobService.saveJob(job);
        return ResponseEntity.ok(savedJob);
    }
}
