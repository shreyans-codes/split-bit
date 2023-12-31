package com.sheru.SplitBitApi.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RegisterResponseDTO {
    private AuthUser user;
    private String secretImageUri;
}
