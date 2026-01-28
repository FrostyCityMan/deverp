package com.deverp.api.controller;

import com.deverp.api.service.FileAttachmentService;
import com.deverp.core.domain.FileAttachment;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
@Tag(name = "파일", description = "첨부 파일 관리")
public class FileAttachmentController {
    private final FileAttachmentService fileAttachmentService;

    @Operation(summary = "첨부 파일 조회")
    @GetMapping("/{id}")
    public ResponseEntity<FileAttachment> getAttachment(@PathVariable Long id) {
        return ResponseEntity.ok(fileAttachmentService.getAttachment(id));
    }

    @Operation(summary = "첨부 파일 메타데이터 등록")
    @PostMapping
    public ResponseEntity<FileAttachment> createAttachment(@RequestBody FileAttachment attachment) {
        return ResponseEntity.ok(fileAttachmentService.saveAttachment(attachment));
    }
}
