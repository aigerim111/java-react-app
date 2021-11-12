package com.example.calendarApp.repository;


import com.example.calendarApp.entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar,Long> {
    Calendar findCalendarByCalendarId(Long id);
    Calendar findCalendarByCalendarName(String calendarName);
    Calendar findCalendarByUniqueCode(Long uniqueCode);
}
