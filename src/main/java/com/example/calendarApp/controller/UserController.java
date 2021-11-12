package com.example.calendarApp.controller;

import com.example.calendarApp.entity.Calendar;
import com.example.calendarApp.entity.Notation;
import com.example.calendarApp.entity.RequestAnswer;
import com.example.calendarApp.service.CalendarService;
import com.example.calendarApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    CalendarService calendarService;

    @GetMapping("/getCalendarList")
    public ResponseEntity<List<Calendar>> getCalendarList(HttpServletRequest request){
        String username = request.getParameter("username");
        if (username == null){
            throw new RuntimeException("Please, sign in!");
        }
         return ResponseEntity.ok().body(userService.getCalendars(username));
    }

    @PostMapping("/addCalendar")
    public ResponseEntity<String> createCalendar(HttpServletRequest request){
        String calendarName = request.getParameter("calendarName");
        String username = request.getParameter("username");
        Map<String, String> requestAnswer = userService.addCalendar(calendarName,username);

        if(requestAnswer.containsKey("Error")){
            return ResponseEntity
                    .badRequest()
                    .body(requestAnswer.get("Error"));
        }

        return ResponseEntity.ok().body(requestAnswer.get("Message"));
    }

    @PostMapping("/addNotation")
    public ResponseEntity<String> addNotation(HttpServletRequest request, @RequestBody Notation notation){
        String calendarId = request.getParameter("calendarId");
        Map<String, String> requestAnswer = calendarService.addNotation(calendarId,notation);

        if(requestAnswer.containsKey("Error")){
            return ResponseEntity
                    .badRequest()
                    .body(requestAnswer.get("Error"));
        }

        return ResponseEntity.ok().body(requestAnswer.get("Message"));
    }

    @PostMapping("/deleteCalendar")
    public ResponseEntity<String> deleteCalendar(HttpServletRequest request) {
        String calId = request.getParameter("calId");
        Map<String, String> requestAnswer = userService.deleteCalendar(calId);

        if(requestAnswer.containsKey("Error")){
            return ResponseEntity
                    .badRequest()
                    .body(requestAnswer.get("Error"));
        }

        return ResponseEntity.ok().body(requestAnswer.get("Message"));
    }

    @PostMapping("/findCalendar")
    public RequestAnswer findCalendar(String uniqueCode) {
        return userService.findCalendar(uniqueCode);
    }

    @PostMapping("/updateCalendar")
    public ResponseEntity<String> updateCalendarName(HttpServletRequest request) {
        String calId = request.getParameter("calId");
        String newName = request.getParameter("newName");

        Map<String, String> requestAnswer = calendarService.updateCalendar(calId,newName);
        if(requestAnswer.containsKey("Error")){
            return ResponseEntity
                    .badRequest()
                    .body(requestAnswer.get("Error"));
        }

        return ResponseEntity.ok().body(requestAnswer.get("Message"));}

}
