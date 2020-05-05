package by.bsu.pashkovich.exception.authentication;

import by.bsu.pashkovich.exception.ServiceException;

public class AuthenticationException extends ServiceException {
    public AuthenticationException(String message) {
        super(message);
    }

    public AuthenticationException(String message, Throwable e) {
        super(message, e);
    }
}
