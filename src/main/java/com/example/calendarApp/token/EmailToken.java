package com.example.calendarApp.token;

import com.example.calendarApp.entity.AppUser;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
public class EmailToken {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long tokenId;

    private String token;

    private LocalDateTime expiryDate;

    private LocalDateTime createdDate;

    @OneToOne(fetch = FetchType.LAZY)
    private AppUser user;

    public EmailToken(AppUser user) {
        this.token = UUID.randomUUID().toString();
        this.createdDate=LocalDateTime.now();
        this.expiryDate = createdDate.plusHours(24);
        this.user = user;
    }

    public EmailToken() {

    }
}
