package com.deverp.core.domain;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class IssueComment {
    /** 코멘트 ID */
    private Long id;
    /** 이슈 ID */
    private Long issueId;
    /** 작성자 ID */
    private Long authorId;
    /** 내용 */
    private String content;
    /** 생성 일시 */
    private LocalDateTime createdAt;
}
