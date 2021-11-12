package com.example.calendarApp.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long calendarId;

    String calendarName;

    Long uniqueCode;


    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    List<Notation> notations;


    public Calendar(String calendarName) {
        this.calendarName = calendarName;
        this.uniqueCode = (long)(Math.random() * 10000000);
    }

    public Calendar() {

    }
}
