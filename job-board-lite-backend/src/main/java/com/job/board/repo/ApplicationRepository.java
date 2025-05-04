package com.job.board.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.job.board.dvo.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
	boolean existsByEmailAndJobId(String email, Long jobId);
	List<Application> findByEmail(String email);
}
