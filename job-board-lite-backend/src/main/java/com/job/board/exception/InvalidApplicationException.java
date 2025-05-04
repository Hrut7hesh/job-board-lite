package com.job.board.exception;

public class InvalidApplicationException extends RuntimeException {
    public InvalidApplicationException(String message) {
        super("Invalid Application: " + message);
    }
}
