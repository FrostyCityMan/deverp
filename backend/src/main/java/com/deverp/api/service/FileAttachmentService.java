package com.deverp.api.service;

import com.deverp.core.domain.FileAttachment;
import com.deverp.core.mapper.FileAttachmentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FileAttachmentService {
    private final FileAttachmentMapper fileAttachmentMapper;

    public FileAttachment getAttachment(Long id) {
        return fileAttachmentMapper.findById(id);
    }

    @Transactional
    public FileAttachment saveAttachment(FileAttachment attachment) {
        fileAttachmentMapper.insert(attachment);
        return fileAttachmentMapper.findById(attachment.getId());
    }
}
