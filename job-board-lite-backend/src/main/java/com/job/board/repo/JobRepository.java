package com.job.board.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.job.board.dvo.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
	Job findByTitleAndCompanyAndLocation(String title, String company, String location);
    List<Job> findByTitleContainingIgnoreCase(String keyword);
}