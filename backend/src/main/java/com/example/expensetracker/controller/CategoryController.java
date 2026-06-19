package com.example.expensetracker.controller;

import com.example.expensetracker.entity.Category;
import com.example.expensetracker.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.PostConstruct;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryRepository repository;

    public CategoryController(CategoryRepository repository) { this.repository = repository; }

    @PostConstruct
    public void init() {
        if (repository.count() == 0) {
            repository.save(new Category("Groceries"));
            repository.save(new Category("Housing"));
            repository.save(new Category("Transportation"));
            repository.save(new Category("Entertainment"));
            repository.save(new Category("Utilities"));
        }
    }

    @GetMapping
    public List<Category> getAll() { return repository.findAll(); }

    @PostMapping
    public Category create(@RequestBody Category category) { return repository.save(category); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { repository.deleteById(id); }
}
