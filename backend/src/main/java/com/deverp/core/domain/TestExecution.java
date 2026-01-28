package com.deverp.core.domain;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class TestExecution {
    /** 실행 이력 ID */
    private Long id;
    /** 테스트 케이스 ID */
    private Long testCaseId;
    /** 담당자 ID */
    private Long testerId;
    /** 실제 결과 */
    private String actualResult;
    /** 성공 여부 */
    private boolean passed;
    /** 실행 일시 */
    private LocalDateTime executedAt;
    /** 첨부 파일 ID */
    private Long attachmentId;
}
