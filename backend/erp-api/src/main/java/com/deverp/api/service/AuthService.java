package com.deverp.api.service;

import com.deverp.api.dto.AuthRequest;
import com.deverp.api.dto.AuthResponse;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public AuthResponse login(AuthRequest request) {
        AuthResponse response = new AuthResponse();
        response.setToken("demo-token-" + request.getUsername());
        response.setTokenType("Bearer");
        return response;
    }

    public void logout(String token) {
        // 토큰 무효화 처리 (현재는 샘플 구현)
    }
}
