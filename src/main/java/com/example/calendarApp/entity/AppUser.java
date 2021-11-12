package com.example.calendarApp.entity;


import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

import java.util.List;


@Entity
@Getter
@Setter
public class AppUser{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long userId;

    private String email;

    private String username;

    private String password;

    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    List<Calendar> calendars;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    Collection<Role> roles = new ArrayList<>();

    private boolean isEnabled;

    public AppUser(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.isEnabled = true;
    }

    public AppUser() {

    }

    public Collection<Role> getRoles() {
        return roles;
    }
}
