package com.deverp.core.mapper;

import com.deverp.core.domain.Issue;
import java.util.List;

public interface IssueMapper {
    List<Issue> findByProjectId(Long projectId);

    Issue findById(Long id);

    int insert(Issue issue);

    int update(Issue issue);

    int delete(Long id);
}
