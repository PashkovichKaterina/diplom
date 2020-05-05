package by.bsu.pashkovich.exception.authentication;

public class RefreshTokenException extends AuthenticationException {
    public RefreshTokenException(String message) {
        super(message);
    }

    public RefreshTokenException(String message, Throwable e) {
        super(message, e);
    }
}
