package com.deverp.core.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ProjectTask {
    /** 작업 ID */
    private Long id;
    /** 프로젝트 ID */
    private Long projectId;
    /** 단계 ID */
    private Long phaseId;
    /** 작업 제목 */
    private String title;
    /** 담당자 ID */
    private Long assigneeId;
    /** 시작일 */
    private LocalDate startDate;
    /** 종료일 */
    private LocalDate endDate;
    /** 진행률 */
    private Integer progressRate;
    /** 예상 공수(시간) */
    private Integer estimatedHours;
    /** 실제 공수(시간) */
    private Integer actualHours;
    /** 생성 일시 */
    private LocalDateTime createdAt;
    /** 수정 일시 */
    private LocalDateTime updatedAt;
}
