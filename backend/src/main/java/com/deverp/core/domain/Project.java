package com.deverp.core.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class Project {
    /** 프로젝트 ID */
    private Long id;
    /** 프로젝트 코드 */
    private String code;
    /** 프로젝트 이름 */
    private String name;
    /** 시작일 */
    private LocalDate startDate;
    /** 종료일 */
    private LocalDate endDate;
    /** 상태 */
    private String status;
    /** 생성 일시 */
    private LocalDateTime createdAt;
    /** 수정 일시 */
    private LocalDateTime updatedAt;
}
