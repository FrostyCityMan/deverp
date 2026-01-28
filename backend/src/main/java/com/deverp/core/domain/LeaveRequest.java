package com.deverp.core.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class LeaveRequest {
    /** 연차 신청 ID */
    private Long id;
    /** 사용자 ID */
    private Long userId;
    /** 휴가 유형 (ANNUAL/HALF/SICK 등) */
    private String leaveType;
    /** 시작일 */
    private LocalDate startDate;
    /** 종료일 */
    private LocalDate endDate;
    /** 신청 사유 */
    private String reason;
    /** 결재 상태 (PENDING/APPROVED/REJECTED) */
    private String approvalStatus;
    /** 결재자 ID */
    private Long approverId;
    /** 결재 일시 */
    private LocalDateTime approvedAt;
    /** 생성 일시 */
    private LocalDateTime createdAt;
    /** 수정 일시 */
    private LocalDateTime updatedAt;
}
