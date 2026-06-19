package com.example.expensetracker.controller;

import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    private final ExpenseRepository repository;
    private final CategoryRepository categoryRepository;

    public ExpenseController(ExpenseRepository repository, CategoryRepository categoryRepository) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<Expense> getAll(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {
        if (startDate != null && endDate != null) {
            return repository.findByDateBetweenOrderByDateDesc(startDate, endDate);
        }
        return repository.findAll();
    }

    @PostMapping
    public Expense create(@RequestBody Expense expense) {
        if (expense.getCategory() == null || expense.getCategory().getId() == null) {
            throw new IllegalArgumentException("Category is required");
        }
        var category = categoryRepository.findById(expense.getCategory().getId())
            .orElseThrow(() -> new IllegalArgumentException("Invalid category"));
        expense.setCategory(category);
        return repository.save(expense);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { repository.deleteById(id); }
}
