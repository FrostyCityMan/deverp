package com.deverp.core.domain;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class FileAttachment {
    /** 첨부 파일 ID */
    private Long id;
    /** 원본 파일명 */
    private String originalName;
    /** 저장 파일명 */
    private String storedName;
    /** 저장 경로 */
    private String storagePath;
    /** MIME 타입 */
    private String contentType;
    /** 파일 크기 */
    private Long fileSize;
    /** 업로더 ID */
    private Long uploaderId;
    /** 생성 일시 */
    private LocalDateTime createdAt;
}
