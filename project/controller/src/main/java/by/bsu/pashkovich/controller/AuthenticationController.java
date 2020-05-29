package by.bsu.pashkovich.controller;

import by.bsu.pashkovich.dto.ErrorResponse;
import by.bsu.pashkovich.dto.TokenDto;
import by.bsu.pashkovich.dto.UserDto;
import by.bsu.pashkovich.service.UserService;
import by.bsu.pashkovich.util.ResponseMessage;
import by.bsu.pashkovich.validation.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/english2C")
public class AuthenticationController {
    private UserService userService;
    private UserValidator userValidator;
    private ResponseMessage responseMessage;

    @Autowired
    public AuthenticationController(UserService userService, UserValidator userValidator,
                                    ResponseMessage responseMessage) {
        this.userService = userService;
        this.userValidator = userValidator;
        this.responseMessage = responseMessage;
    }

    @InitBinder("userDto")
    protected void initUserBinder(WebDataBinder binder) {
        binder.setValidator(userValidator);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UserDto userDto) {
        TokenDto tokenDto = userService.login(userDto.getLogin(), userDto.getPassword());
        return new ResponseEntity<>(tokenDto, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity signup(@Validated @RequestBody UserDto userDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            ErrorResponse errorResponse = new ErrorResponse("invalidData",
                    responseMessage.formErrorMessage(bindingResult));
            return ResponseEntity.badRequest().body(errorResponse);
        }
        UserDto createdUser = userService.signup(userDto);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/refreshToken")
    public ResponseEntity refreshToken(@RequestBody TokenDto tokenDto) {
        TokenDto refreshedTokenDto = userService.refreshToken(tokenDto);
        return new ResponseEntity<>(refreshedTokenDto, HttpStatus.OK);
    }
}