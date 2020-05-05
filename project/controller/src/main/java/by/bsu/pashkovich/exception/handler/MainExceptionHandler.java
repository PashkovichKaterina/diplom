package by.bsu.pashkovich.exception.handler;

import by.bsu.pashkovich.dto.ErrorResponse;
import by.bsu.pashkovich.exception.authentication.AuthenticationException;
import by.bsu.pashkovich.exception.authentication.RefreshTokenException;
import by.bsu.pashkovich.exception.authentication.SignupException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class MainExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = {SignupException.class})
    public ResponseEntity handleAuthenticationException(SignupException e, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(e.getExceptionCode(), e.getMessage());
        return handleExceptionInternal(e, errorResponse, new HttpHeaders(), HttpStatus.UNAUTHORIZED, request);
    }

    @ExceptionHandler(value = {RefreshTokenException.class})
    public ResponseEntity handleAuthenticationException(RefreshTokenException e, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse("refreshTokenError", "Invalid tokens");
        return handleExceptionInternal(e, errorResponse, new HttpHeaders(), HttpStatus.UNAUTHORIZED, request);
    }

    @ExceptionHandler(value = {AuthenticationException.class})
    public ResponseEntity handleAuthenticationException(AuthenticationException e, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse("loginError", "Invalid login or password");
        return handleExceptionInternal(e, errorResponse, new HttpHeaders(), HttpStatus.UNAUTHORIZED, request);
    }
}