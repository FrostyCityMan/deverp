package com.deverp.core.mapper;

import com.deverp.core.domain.LeaveRequest;
import java.util.List;

public interface LeaveRequestMapper {
    List<LeaveRequest> findByUserId(Long userId);

    LeaveRequest findById(Long id);

    int insert(LeaveRequest request);

    int updateStatus(LeaveRequest request);

    int delete(Long id);
}
