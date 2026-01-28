package com.deverp.api.dto;

import lombok.Data;

@Data
public class AuthResponse {
    /** 발급된 토큰 */
    private String token;
    /** 토큰 타입 */
    private String tokenType;
}
