package com.example.calendarApp.service;


import com.example.calendarApp.entity.*;
import com.example.calendarApp.entity.Calendar;
import com.example.calendarApp.repository.RoleRepository;
import com.example.calendarApp.repository.UserRepository;
import com.example.calendarApp.token.EmailSender;
import com.example.calendarApp.token.EmailToken;
import com.example.calendarApp.token.EmailTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;

import java.time.LocalDateTime;
import java.util.*;


@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository repository;

    @Autowired
    CalendarService calendarService;

    @Autowired
    RoleRepository roleRepo;

    @Autowired
    EmailTokenRepository emailTokenRepository;

    @Autowired
    EmailSender emailSender;

    @Autowired
    PasswordEncoder encoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = repository.findAppUserByUsername(username);

        if(user == null){throw new UsernameNotFoundException("User not found in the database");}

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

        user.getRoles().forEach(role -> {authorities.add(new SimpleGrantedAuthority(role.getName()));});
        boolean isAccountNonExpired = true;
        boolean isCredentialsNonExpired = true;
        boolean isAccountNonLocked = true;
        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                user.getPassword(),
                user.isEnabled(),
                isAccountNonExpired,
                isCredentialsNonExpired,
                isAccountNonLocked,
                authorities);
    }

    public AppUser getUserByUsername(String username){
        return repository.findAppUserByUsername(username);
    }

    public Map<String,String> registerUser(AppUser user) {
        AppUser checkUserByEmail = repository.findAppUserByEmail(user.getEmail());
        AppUser checkUserByUsername = repository.findAppUserByUsername(user.getUsername());

        Map<String, String> response = new HashMap<>();
        if(checkUserByEmail!=null) {
            response.put("Error","User with the given email exists!");
            return response;
        }

        if(checkUserByUsername!=null){
            response.put("Error","User with the given username exists!");
            return response;
        }

        if (user.getPassword() == null || user.getPassword() == "") {
            response.put("Error","Password cannot be empty!");
            return response;
        }

        user.setPassword(encoder.encode(user.getPassword()));
        Role role = roleRepo.findByName(ERole.ROLE_USER);
        user.getRoles().add(role);
        repository.save(user);

        EmailToken token = new EmailToken(user);
        emailTokenRepository.save(token);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("To confirm your account, please click here : "
                +"http://localhost:8080/confirm?token="+token.getToken());

        emailSender.sendEmail(mailMessage);
        response.put("Message","You have successfully registered!");
        return response;
    }

    public String confirmUser(String givenToken){
        EmailToken token = emailTokenRepository.findEmailTokenByToken(givenToken);
        if(token.getExpiryDate().isBefore(LocalDateTime.now()) && token!=null){
            repository.delete(token.getUser());
            return "Token is already expired!";
        }
        else if(token != null)
        {
            AppUser user = repository.findAppUserByUsername(token.getUser().getUsername());
            user.setEnabled(true);
            repository.save(user);
            emailTokenRepository.delete(emailTokenRepository.findEmailTokenByUser(user));
            return "You have confirmed your email, now you can login!";
        }
        else
        {
            return "Something wrong happened!";
        }
    }

    public List<Calendar> getCalendars(String username){
        AppUser user = repository.findAppUserByUsername(username);
        return user.getCalendars();
    }

    public List<AppUser> getUsers(){
        List<AppUser> users = repository.findAll();
        return repository.findAll();
    }

    public Map<String, String> addCalendar(String calendar, String username){
        AppUser user = repository.findAppUserByUsername(username);
        Map<String, String> response = new HashMap<>();
        if(calendar.isBlank()){
            response.put("Error", "Calendar name can not be empty!");
            return response;
        }

        Calendar newCalendar = calendarService.createCalendar(calendar);
        user.getCalendars().add(newCalendar);
        repository.save(user);

        response.put("Message", "You have created new calendar!");
        return response;

    }

    public Map<String, String> deleteCalendar(String calId) {
        Long calendarId = Long.parseLong(calId);
        Calendar calendar = calendarService.getCalendar(calendarId);
        Map<String, String> requestAnswer = new HashMap<>();

        if(calendar==null){
            requestAnswer.put("Error", "Calendar with that id does not exist!");
            return requestAnswer;
        }

        AppUser user = repository.findAppUserByCalendarsContains(calendar);
        user.getCalendars().remove(calendar);

        repository.save(user);
        calendarService.deleteCalendar(calendar);
        requestAnswer.put("Message", "Calendar was deleted!");
        return requestAnswer;
    }

    public RequestAnswer findCalendar(String uniqueCode) {
        Calendar calendar = calendarService.findCalendar(uniqueCode);
        AppUser user = repository.findAppUserByCalendarsContains(calendar);

        RequestAnswer response = new RequestAnswer(user.getUsername(), calendar);

        return response;
    }
}
