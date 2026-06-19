package com.example.expensetracker.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "app_settings")
public class AppSettings {
    @Id
    private Long id = 1L;

    @Column(nullable = false)
    private String currencyCode = "USD";

    public AppSettings() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCurrencyCode() { return currencyCode; }
    public void setCurrencyCode(String currencyCode) { this.currencyCode = currencyCode; }
}
