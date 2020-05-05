package by.bsu.pashkovich.exception.entity;

import by.bsu.pashkovich.exception.ServiceException;

public class NoSuchEntityException extends ServiceException {
    public NoSuchEntityException(String message) {
        super(message);
    }

    public NoSuchEntityException(String message, Throwable e) {
        super(message, e);
    }
}
