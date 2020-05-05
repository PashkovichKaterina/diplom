package by.bsu.pashkovich.exception.entity;

import by.bsu.pashkovich.exception.ServiceException;

public class EntityIsAlreadyExistsException extends ServiceException {
    public EntityIsAlreadyExistsException(String message) {
        super(message);
    }

    public EntityIsAlreadyExistsException(String message, Throwable e) {
        super(message, e);
    }
}
