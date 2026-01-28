package com.deverp.core.mapper;

import com.deverp.core.domain.FileAttachment;

public interface FileAttachmentMapper {
    FileAttachment findById(Long id);

    int insert(FileAttachment attachment);

    int delete(Long id);
}
