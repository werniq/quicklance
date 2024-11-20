package com.quicklance.backend.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionsHandler {

    @ExceptionHandler(value = {TaskDoesNotExist.class})
    public ResponseEntity<Object> handleException(TaskDoesNotExist e) {
        return handleBadRequestException(e);
    }

    private ResponseEntity<Object> handleBadRequestException(RuntimeException e) {
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        ExceptionResponse wrongCategoryResponse = new ExceptionResponse(
                e.getMessage(),
                badRequest
        );
        return new ResponseEntity<>(wrongCategoryResponse, badRequest);
    }
}
