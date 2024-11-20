package com.quicklance.backend.exception;

public class TaskDoesNotExist extends RuntimeException {
    public TaskDoesNotExist(String message) {
        super(message);
    }
}
