package com.job.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.job.board.dvo.Application;
import com.job.board.dvo.Job;
import com.job.board.exception.JobNotFoundException;
import com.job.board.exception.InvalidApplicationException;
import com.job.board.repo.ApplicationRepository;
import com.job.board.repo.JobRepository;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    public Application submitApplication(Application application) {
        if (application == null || application.getEmail() == null || application.getEmail().isEmpty()) {
            throw new InvalidApplicationException("Missing email.");
        }

        Long jobId = application.getJob() != null ? application.getJob().getId() : null;
        if (jobId == null) {
            throw new JobNotFoundException(null);
        }

        boolean alreadyApplied = applicationRepository.existsByEmailAndJobId(application.getEmail(), jobId);
        if (alreadyApplied) {
            throw new InvalidApplicationException("You have already applied for this job.");
        }

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new JobNotFoundException(jobId));

        application.setJob(job);
        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsByEmail(String email) {
        if (email == null || email.isEmpty()) {
            throw new InvalidApplicationException("Email cannot be empty.");
        }
        return applicationRepository.findByEmail(email);
    }
}
