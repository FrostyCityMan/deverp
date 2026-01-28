package com.deverp.api.service;

import com.deverp.core.domain.LeaveRequest;
import com.deverp.core.mapper.LeaveRequestMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LeaveService {
    private final LeaveRequestMapper leaveRequestMapper;

    public List<LeaveRequest> getUserLeaves(Long userId) {
        return leaveRequestMapper.findByUserId(userId);
    }

    @Transactional
    public LeaveRequest requestLeave(LeaveRequest request) {
        request.setApprovalStatus("PENDING");
        leaveRequestMapper.insert(request);
        return leaveRequestMapper.findById(request.getId());
    }
}
