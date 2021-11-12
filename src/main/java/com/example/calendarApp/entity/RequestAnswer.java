package com.example.calendarApp.entity;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RequestAnswer {
    String username;
    Calendar calendar;

    public RequestAnswer(String username, Calendar calendar) {
        this.username = username;
        this.calendar = calendar;
    }
}
