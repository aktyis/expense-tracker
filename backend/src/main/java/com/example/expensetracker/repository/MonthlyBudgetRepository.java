package com.example.expensetracker.repository;

import com.example.expensetracker.entity.MonthlyBudget;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MonthlyBudgetRepository extends JpaRepository<MonthlyBudget, Long> {
    Optional<MonthlyBudget> findByYearAndMonth(Integer year, Integer month);
}
