package by.bsu.pashkovich.exception;

public class PageableException extends ServiceException {
    public PageableException(String message) {
        super(message);
    }

    public PageableException(String message, Throwable e) {
        super(message, e);
    }
}
