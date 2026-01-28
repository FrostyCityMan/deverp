package com.deverp.core.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ProjectPhase {
    /** 단계 ID */
    private Long id;
    /** 프로젝트 ID */
    private Long projectId;
    /** 단계 이름 */
    private String name;
    /** 시작일 */
    private LocalDate startDate;
    /** 종료일 */
    private LocalDate endDate;
    /** 생성 일시 */
    private LocalDateTime createdAt;
    /** 수정 일시 */
    private LocalDateTime updatedAt;
}
