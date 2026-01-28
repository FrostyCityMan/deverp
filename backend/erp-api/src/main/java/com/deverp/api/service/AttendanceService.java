package com.deverp.api.service;

import com.deverp.core.domain.AttendanceRecord;
import com.deverp.core.mapper.AttendanceMapper;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceMapper attendanceMapper;

    public List<AttendanceRecord> getUserAttendance(Long userId) {
        return attendanceMapper.findByUserId(userId);
    }

    @Transactional
    public AttendanceRecord checkIn(Long userId, LocalDate workDate) {
        AttendanceRecord record = new AttendanceRecord();
        record.setUserId(userId);
        record.setWorkDate(workDate);
        record.setStatus("NORMAL");
        attendanceMapper.insert(record);
        return attendanceMapper.findByUserAndDate(userId, workDate);
    }
}
