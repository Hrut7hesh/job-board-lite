package com.job.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.job.board.dvo.Application;
import com.job.board.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<Application> submitApplication(@RequestBody Application application) {
        Application savedApp = applicationService.submitApplication(application);
        return ResponseEntity.ok(savedApp);
    }

    @GetMapping
    public ResponseEntity<List<Application>> getApplicationsByEmail(@RequestParam("email") String email) {
        List<Application> applications = applicationService.getApplicationsByEmail(email);
        return ResponseEntity.ok(applications);
    }
}
