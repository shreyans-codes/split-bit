package com.sheru.SplitBitApi.Model;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginResponseDTO {
    private User user;
    private String jwt;
}
