package com.example.calendarApp.repository;

import com.example.calendarApp.entity.Notation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotationRepository extends JpaRepository<Notation, Long> {
}
