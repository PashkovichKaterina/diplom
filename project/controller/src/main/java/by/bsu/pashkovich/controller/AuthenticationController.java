package by.bsu.pashkovich.controller;

import by.bsu.pashkovich.dto.TokenDto;
import by.bsu.pashkovich.dto.UserDto;
import by.bsu.pashkovich.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/english2C")
public class AuthenticationController {
    private UserService userService;

    @Autowired
    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UserDto userDto) {
        TokenDto tokenDto = userService.login(userDto.getLogin(), userDto.getPassword());
        return new ResponseEntity<>(tokenDto, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody UserDto userDto) {
        UserDto createdUser = userService.signup(userDto);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/refreshToken")
    public ResponseEntity refreshToken(@RequestBody TokenDto tokenDto) {
        TokenDto refreshedTokenDto = userService.refreshToken(tokenDto);
        return new ResponseEntity<>(refreshedTokenDto, HttpStatus.OK);
    }
}