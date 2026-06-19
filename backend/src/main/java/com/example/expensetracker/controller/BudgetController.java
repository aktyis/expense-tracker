package com.example.expensetracker.controller;

import com.example.expensetracker.entity.MonthlyBudget;
import com.example.expensetracker.repository.MonthlyBudgetRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
    private final MonthlyBudgetRepository repository;

    public BudgetController(MonthlyBudgetRepository repository) { this.repository = repository; }

    @GetMapping
    public List<MonthlyBudget> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{year}/{month}")
    public MonthlyBudget getByMonth(@PathVariable Integer year, @PathVariable Integer month) {
        return repository.findByYearAndMonth(year, month).orElse(null);
    }

    @PostMapping
    public MonthlyBudget saveOrUpdate(@RequestBody MonthlyBudget budget) {
        MonthlyBudget existing = repository.findByYearAndMonth(budget.getYear(), budget.getMonth()).orElse(null);
        if (existing != null) {
            existing.setAmount(budget.getAmount());
            return repository.save(existing);
        }
        return repository.save(budget);
    }
}
