package com.example.calendarApp.service;

import com.example.calendarApp.entity.Calendar;
import com.example.calendarApp.entity.Notation;
import com.example.calendarApp.repository.CalendarRepository;
import com.example.calendarApp.repository.NotationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Entity;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class CalendarService {
    @Autowired
    CalendarRepository calendarRepo;

    @Autowired
    NotationRepository notationRepository;


    public Calendar getCalendar(Long id){
        return calendarRepo.findCalendarByCalendarId(id);
    }

    public void deleteCalendar(Calendar calendar){
        calendarRepo.delete(calendar);
    }

    public Calendar createCalendar(String calendarName){
        if(calendarName == null || calendarName == ""){
            return null;
        }

        Calendar newCalendar = new Calendar(calendarName);
        calendarRepo.save(newCalendar);
        return newCalendar;
    }

    public Map<String, String> addNotation(String calId, Notation notation){
        Map<String, String> requestAnswer = new HashMap<>();

        if(notation.getDescription()==null || notation.getDate() ==null){
            requestAnswer.put("Error","Notation data can not be null!");
            return requestAnswer;
        }

        Long calendarId = Long.parseLong(calId);
        Calendar calendar = calendarRepo.findCalendarByCalendarId(calendarId);

        if(calendar==null){
            requestAnswer.put("Error", "Calendar with that id does not exist!");
            return requestAnswer;
        }


        log.info(notation.getDate().toString());

        notationRepository.save(notation);
        calendar.getNotations().add(notation);
        calendarRepo.save(calendar);

        requestAnswer.put("Message", "Notation was added!");
        return requestAnswer;
    }

    public Calendar findCalendar(String uniqueId) {
        Long calUniqueId = Long.parseLong(uniqueId);

        Calendar calendar = calendarRepo.findCalendarByUniqueCode(calUniqueId);

        return calendar;
    }

    public Map<String, String> updateCalendar(String calId, String newName) {
        Map<String, String> requestAnswer = new HashMap<>();

        if(newName == null || newName == ""){
            requestAnswer.put("Error", "Calendar name cannot be null!");
            return requestAnswer;
        }

        Long calendarId = Long.parseLong(calId);
        Calendar calendar = calendarRepo.findCalendarByCalendarId(calendarId);
        calendar.setCalendarName(newName);

        calendarRepo.save(calendar);

        requestAnswer.put("Message", "Calendar was updated!");
        return requestAnswer;
    }

    }
