package com.example.calendarApp.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long roleId;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;


    public String getName() {
        return name.toString();
    }
}
