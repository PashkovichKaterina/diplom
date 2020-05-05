package by.bsu.pashkovich.exception.authentication;

public class SignupException extends AuthenticationException {
    private String exceptionCode;

    public SignupException(String exceptionCode, String message) {
        super(message);
        this.exceptionCode = exceptionCode;
    }

    public SignupException(String exceptionCode, String message, Throwable e) {
        super(message, e);
        this.exceptionCode = exceptionCode;
    }

    public String getExceptionCode() {
        return exceptionCode;
    }

    public void setExceptionCode(String exceptionCode) {
        this.exceptionCode = exceptionCode;
    }
}
