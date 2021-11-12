package com.example.calendarApp.repository;

import com.example.calendarApp.entity.ERole;
import com.example.calendarApp.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByName(ERole name);
}
