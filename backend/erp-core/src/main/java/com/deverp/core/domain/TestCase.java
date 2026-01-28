package com.deverp.core.domain;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class TestCase {
    /** 테스트 케이스 ID */
    private Long id;
    /** 시나리오 */
    private String scenario;
    /** 전제조건 */
    private String precondition;
    /** 입력값 */
    private String inputValue;
    /** 기대 결과 */
    private String expectedResult;
    /** 생성 일시 */
    private LocalDateTime createdAt;
    /** 수정 일시 */
    private LocalDateTime updatedAt;
}
