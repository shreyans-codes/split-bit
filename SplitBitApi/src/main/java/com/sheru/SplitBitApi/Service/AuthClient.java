package com.sheru.SplitBitApi.Service;

import com.sheru.SplitBitApi.Model.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(url = "http://localhost:8081/auth", value = "Authentication-Client")
public interface AuthClient {

    @PostMapping("/register")
    RegisterResponseDTO registerUser(@RequestBody AuthUser user);

    @PostMapping("/login")
    LoginResponseDTO loginUser(@RequestBody LoginRequestDTO loginRequest);

    @PostMapping("/verify")
    LoginResponseDTO verifyUser(@RequestBody VerificationRequest verificationRequest);
}
