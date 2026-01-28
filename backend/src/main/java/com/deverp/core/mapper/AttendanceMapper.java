package com.deverp.core.mapper;

import com.deverp.core.domain.AttendanceRecord;
import java.time.LocalDate;
import java.util.List;

public interface AttendanceMapper {
    List<AttendanceRecord> findByUserId(Long userId);

    AttendanceRecord findByUserAndDate(Long userId, LocalDate workDate);

    int insert(AttendanceRecord record);

    int update(AttendanceRecord record);

    int delete(Long id);
}
