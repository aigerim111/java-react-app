package com.example.calendarApp.repository;

import com.example.calendarApp.entity.AppUser;
import com.example.calendarApp.entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<AppUser,Long> {
    AppUser findAppUserByEmail(String email);
    AppUser findAppUserByUsername(String username);
    List<AppUser> findAll();
    AppUser findAppUserByCalendarsContains(Calendar calendar);
}
