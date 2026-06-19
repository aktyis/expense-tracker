package com.example.expensetracker.controller;

import com.example.expensetracker.entity.AppSettings;
import com.example.expensetracker.repository.AppSettingsRepository;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.PostConstruct;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {
    private final AppSettingsRepository repository;

    public SettingsController(AppSettingsRepository repository) { this.repository = repository; }

    @PostConstruct
    public void init() {
        if (repository.count() == 0) {
            repository.save(new AppSettings());
        }
    }

    @GetMapping
    public AppSettings getSettings() {
        return repository.findById(1L).orElseThrow();
    }

    @PutMapping
    public AppSettings updateSettings(@RequestBody AppSettings settings) {
        AppSettings existing = getSettings();
        existing.setCurrencyCode(settings.getCurrencyCode());
        return repository.save(existing);
    }
}
