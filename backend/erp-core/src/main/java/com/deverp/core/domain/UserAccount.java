package com.deverp.core.domain;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class UserAccount {
    /** 사용자 고유 식별자 */
    private Long id;
    /** 로그인 아이디 */
    private String username;
    /** 해시 처리된 비밀번호 */
    private String passwordHash;
    /** 사용자 이름 */
    private String fullName;
    /** 부서 코드 */
    private String departmentCode;
    /** 직책 */
    private String jobTitle;
    /** 역할 */
    private String roleCode;
    /** 활성 여부 */
    private boolean active;
    /** 생성 일시 */
    private LocalDateTime createdAt;
    /** 수정 일시 */
    private LocalDateTime updatedAt;
}
