package com.sheru.SplitBitApi.Model;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthUser {
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private boolean mfaEnabled;
    private String application;
}
