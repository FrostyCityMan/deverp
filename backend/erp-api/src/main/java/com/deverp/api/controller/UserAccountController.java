package com.deverp.api.controller;

import com.deverp.api.service.UserAccountService;
import com.deverp.core.domain.UserAccount;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@Tag(name = "회원", description = "계정 및 권한 관리")
public class UserAccountController {
    private final UserAccountService userAccountService;

    @Operation(summary = "사용자 목록 조회")
    @GetMapping
    public ResponseEntity<List<UserAccount>> getUsers() {
        return ResponseEntity.ok(userAccountService.getUsers());
    }

    @Operation(summary = "사용자 생성")
    @PostMapping
    public ResponseEntity<UserAccount> createUser(@RequestBody UserAccount account) {
        return ResponseEntity.ok(userAccountService.createUser(account));
    }
}
