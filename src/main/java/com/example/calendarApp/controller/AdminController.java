package com.example.calendarApp.controller;

import com.example.calendarApp.entity.AppUser;
import com.example.calendarApp.entity.Calendar;
import com.example.calendarApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    UserService userService;

    @GetMapping("/getUserList")
    public ResponseEntity<List<AppUser>> getUserList(){
        return ResponseEntity.ok().body(userService.getUsers());
    }
}
