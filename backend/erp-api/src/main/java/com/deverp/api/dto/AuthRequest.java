package com.deverp.api.dto;

import lombok.Data;

@Data
public class AuthRequest {
    /** 로그인 아이디 */
    private String username;
    /** 비밀번호 */
    private String password;
}
