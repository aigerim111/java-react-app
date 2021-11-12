package com.example.calendarApp.controller.emailController;

import com.example.calendarApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class emailController {

    @Autowired
    UserService userService;

    @GetMapping("/confirm")
    public ResponseEntity<String> confirmUserAccount(@RequestParam("token") String emailToken){
        String requestAnswer = userService.confirmUser(emailToken);
        ModelAndView mav = new ModelAndView();
        mav.setViewName(requestAnswer);
        return ResponseEntity.ok().body(requestAnswer);
    }
}
