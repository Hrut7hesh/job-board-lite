package com.job.board.exception;

public class NoJobsFoundException extends RuntimeException {
    public NoJobsFoundException(String keyword) {
        super("No jobs found for keyword: " + keyword);
    }
}