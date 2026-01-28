package com.deverp.api.controller;

import com.deverp.api.service.LeaveService;
import com.deverp.core.domain.LeaveRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/leaves")
@Tag(name = "연차", description = "연차 신청 및 승인")
public class LeaveController {
    private final LeaveService leaveService;

    @Operation(summary = "사용자 연차 목록 조회")
    @GetMapping("/users/{userId}")
    public ResponseEntity<List<LeaveRequest>> getLeaves(@PathVariable Long userId) {
        return ResponseEntity.ok(leaveService.getUserLeaves(userId));
    }

    @Operation(summary = "연차 신청")
    @PostMapping
    public ResponseEntity<LeaveRequest> requestLeave(@RequestBody LeaveRequest request) {
        return ResponseEntity.ok(leaveService.requestLeave(request));
    }
}
