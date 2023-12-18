package com.sheru.SplitBitApi.Controller;

import com.sheru.SplitBitApi.Model.*;
import com.sheru.SplitBitApi.Repository.FriendRepository;
import com.sheru.SplitBitApi.Service.AuthClient;
import com.sheru.SplitBitApi.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private AuthClient authClient;
    @Autowired
    private UserService userService;
    @Autowired
    private FriendRepository friendRepository;

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody LoginRequestDTO loginRequest) {
        try {
            //Todo: Retrieve saved DB user from userId received
            return authClient.loginUser(loginRequest);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An error was encountered");
        }
    }

    @PostMapping("/register")
    public RegisterResponseDTO registerUser(@RequestBody AuthUser authUser) {
        try {
            authUser.setApplication("Split Bit");
            RegisterResponseDTO response = authClient.registerUser(authUser);
            System.out.println(response);
            User user = User.builder().firstName(response.getUser().getFirstName()).lastName(response.getUser().getLastName()).userId(response.getUser().getUserId()).build();
            User savedUser = userService.createUser(user);
            Friend friend = Friend.builder().name(savedUser.getFirstName() + " " + savedUser.getLastName()).owner(savedUser).build();
            friendRepository.save(friend);
            return response;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyMFACode(@RequestBody VerificationRequest verificationRequest) {
        return ResponseEntity.ok(authClient.verifyUser(verificationRequest));
    }

}
