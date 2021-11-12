package com.example.calendarApp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class Notation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long notationId;

    String description;

    @JsonFormat(pattern = "dd-MM-yyyy")
    Date date;

    public Notation() {
    }
}


