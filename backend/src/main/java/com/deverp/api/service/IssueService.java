package com.deverp.api.service;

import com.deverp.core.domain.Issue;
import com.deverp.core.mapper.IssueMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class IssueService {
    private final IssueMapper issueMapper;

    public List<Issue> getProjectIssues(Long projectId) {
        return issueMapper.findByProjectId(projectId);
    }

    @Transactional
    public Issue createIssue(Issue issue) {
        issueMapper.insert(issue);
        return issueMapper.findById(issue.getId());
    }
}
