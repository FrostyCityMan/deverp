package com.deverp.api.controller;

import com.deverp.api.service.AttendanceService;
import com.deverp.core.domain.AttendanceRecord;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/attendance")
@Tag(name = "출석", description = "출근/퇴근 및 근무 상태 관리")
public class AttendanceController {
    private final AttendanceService attendanceService;

    @Operation(summary = "사용자 출석 기록 조회")
    @GetMapping("/users/{userId}")
    public ResponseEntity<List<AttendanceRecord>> getAttendance(@PathVariable Long userId) {
        return ResponseEntity.ok(attendanceService.getUserAttendance(userId));
    }

    @Operation(summary = "출근 체크")
    @PostMapping("/users/{userId}/check-in")
    public ResponseEntity<AttendanceRecord> checkIn(
        @PathVariable Long userId,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ResponseEntity.ok(attendanceService.checkIn(userId, date));
    }
}
