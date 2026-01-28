package com.deverp.core.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class Issue {
    /** 이슈 ID */
    private Long id;
    /** 프로젝트 ID */
    private Long projectId;
    /** 유형 (PROJECT/INFRA/OPS 등) */
    private String category;
    /** 제목 */
    private String title;
    /** 상세 내용 */
    private String description;
    /** 상태 (OPEN/IN_PROGRESS/ON_HOLD/DONE) */
    private String status;
    /** 심각도 */
    private String severity;
    /** 담당자 ID */
    private Long assigneeId;
    /** 마감일 */
    private LocalDate dueDate;
    /** 태그 */
    private String tags;
    /** 생성 일시 */
    private LocalDateTime createdAt;
    /** 수정 일시 */
    private LocalDateTime updatedAt;
}
