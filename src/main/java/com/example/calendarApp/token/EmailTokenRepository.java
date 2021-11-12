package com.example.calendarApp.token;

import com.example.calendarApp.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailTokenRepository extends JpaRepository<EmailToken,Long> {
    EmailToken findEmailTokenByToken(String token);
    EmailToken findEmailTokenByUser(AppUser user);
}
