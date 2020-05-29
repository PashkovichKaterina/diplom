package by.bsu.pashkovich.util;

import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Component
public class ResponseMessage {
    public static final String LINK = "Link";
    public static final String LOCATION = "Location";

    public List<String> formErrorMessage(BindingResult bindingResult) {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("errors");
        List<String> errorsList = new ArrayList<>();
        for (ObjectError errorObject : bindingResult.getAllErrors()) {
            errorsList.add(messageSource.getMessage(errorObject, Locale.ENGLISH));
        }
        return errorsList;
    }

    public List<String> formErrorMessage(BindingResult... bindingResults) {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("errors");
        List<String> errorsList = new ArrayList<>();
        for (BindingResult bindingResult : bindingResults) {
            if (bindingResult.hasErrors()) {
                errorsList.addAll(formErrorMessage(bindingResult));
            }
        }
        return errorsList;
    }
}