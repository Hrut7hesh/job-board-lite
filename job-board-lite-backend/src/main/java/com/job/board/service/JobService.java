package com.job.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.job.board.dvo.Job;
import com.job.board.exception.JobAlreadyExistsException;
import com.job.board.exception.JobNotFoundException;
import com.job.board.exception.NoJobsFoundException;
import com.job.board.repo.JobRepository;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        if (jobs.isEmpty()) {
            throw new NoJobsFoundException("any");
        }
        return jobs;
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException(id));
    }

    public List<Job> searchJobsByTitle(String keyword) {
        List<Job> jobs = jobRepository.findByTitleContainingIgnoreCase(keyword);
        if (jobs.isEmpty()) {
            throw new NoJobsFoundException(keyword);
        }
        return jobs;
    }

    public Job saveJob(Job job) {
    	Job existingJob = jobRepository.findByTitleAndCompanyAndLocation(job.getTitle(), job.getCompany(), job.getLocation());
        
        if (existingJob != null) {
            throw new JobAlreadyExistsException("Job with the same title, company, and location already exists.");
        }
        return jobRepository.save(job);
    }
}
