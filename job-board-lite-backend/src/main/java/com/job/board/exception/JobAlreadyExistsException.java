package com.job.board.exception;

public class JobAlreadyExistsException extends RuntimeException {
    public JobAlreadyExistsException(String message) {
        super(message);
    }
}
