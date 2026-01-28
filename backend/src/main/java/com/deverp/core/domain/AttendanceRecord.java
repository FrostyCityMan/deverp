package com.deverp.core.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class AttendanceRecord {
    /** 출석 기록 ID */
    private Long id;
    /** 사용자 ID */
    private Long userId;
    /** 근무 날짜 */
    private LocalDate workDate;
    /** 출근 시간 */
    private LocalDateTime checkInAt;
    /** 퇴근 시간 */
    private LocalDateTime checkOutAt;
    /** 근무 상태 (NORMAL/LATE/REMOTE 등) */
    private String status;
    /** 근무 메모 */
    private String note;
    /** 생성 일시 */
    private LocalDateTime createdAt;
    /** 수정 일시 */
    private LocalDateTime updatedAt;
}
