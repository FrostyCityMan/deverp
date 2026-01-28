package com.deverp.core.mapper;

import com.deverp.core.domain.Project;
import java.util.List;

public interface ProjectMapper {
    List<Project> findAll();

    Project findById(Long id);

    int insert(Project project);

    int update(Project project);

    int delete(Long id);
}
