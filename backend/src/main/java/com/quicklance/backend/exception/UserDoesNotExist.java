package com.quicklance.backend.exception;

public class UserDoesNotExist extends RuntimeException {
    public UserDoesNotExist(String message) {
        super(message);
    }
}
