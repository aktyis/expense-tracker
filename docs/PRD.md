## Problem Statement

The user needs a way to track their personal expenses to understand where their money is going. They lack a streamlined tool to get daily and monthly visual overviews of their spending, manage monthly budgets accurately over time, and handle their finances securely using their preferred global currency.

## Solution

A web application built with a decoupled architecture: a modern React + Vite SPA frontend styled with Tailwind CSS, and a robust Java Spring Boot backend. The application provides a dashboard with charts and data tables for visualizing expenses, allows for dynamic user-defined categories, tracks historical monthly budgets without destroying past records, and persists data locally using a file-based H2 database protected by Basic Authentication.

## User Stories

1. As a user, I want to securely log into the application using basic authentication, so that my personal financial data remains private.
2. As a user, I want to add a new expense providing the amount, date, description, and category, so that my spending is accurately recorded.
3. As a user, I want to view a dashboard containing a line or bar chart of my daily and monthly expenses, so that I can visualize my spending trends over time.
4. As a user, I want to view a data table of my recent transactions on the dashboard, so that I can quickly verify my recent activity.
5. As a user, I want to create, edit, and delete custom expense categories, so that I can organize my spending in a way that matches my lifestyle.
6. As a user, I want to set a global preferred currency in the application settings, so that all amounts (expenses, budgets, totals) are formatted correctly for my locale.
7. As a user, I want to assign a total budget for a specific month and year, so that I have a spending target for the current period.
8. As a user, I want past months to retain their specific budget amounts even if I change my budget for the current month, so that my historical data and past performance remain accurate.
9. As a user, I want to see a visual progress indicator on the dashboard comparing my current month's expenses against that month's budget, so that I know exactly how much remaining budget I have.
10. As a user, I want my data to be persisted to a local file rather than in-memory, so that I don't lose my financial history when the server is restarted.

## Implementation Decisions

- **Frontend Stack**: React initialized via Vite, utilizing Tailwind CSS for utility-first styling and Recharts for dashboard data visualization.
- **Backend Stack**: Java Spring Boot utilizing Spring Web, Spring Data JPA, and Spring Security for Basic Authentication.
- **Database**: H2 Database configured in file-based persistence mode (`jdbc:h2:file:./data/expenses`) to ensure data outlives the server process.
- **Schema Shape**:
  - `Expense`: `id`, `amount`, `date`, `description`, `category_id` (foreign key)
  - `Category`: `id`, `name`
  - `AppSettings`: `id`, `global_currency_code` (Single row enforcing global state)
  - `MonthlyBudget`: `id`, `year`, `month`, `budget_amount`
- **Architectural Seams**:
  - The frontend and backend are completely decoupled, communicating via a RESTful JSON API.
  - State management for global properties (like the currency code) will be loaded once on app start and provided globally to React components.

## Testing Decisions

- **API Integration Seam (Backend)**: We will test the Spring Boot application using `@SpringBootTest` alongside `MockMvc`. We will avoid testing internal service methods directly; instead, we will issue mock HTTP requests to the controllers and verify the resulting HTTP status codes, JSON payloads, and the final state of the H2 database.
- **Component Integration Seam (Frontend)**: We will test the React application using React Testing Library (RTL). Mock Service Worker (MSW) will be used to intercept API calls and return mock data (e.g., expenses, budgets). We will test user interactions like clicking "Submit" on the expense form and verify that the UI updates correctly based on the mocked API response.

## Out of Scope

- Multi-tenant architecture or multiple user accounts (this is strictly a personal tracker).
- Live API integration for real-time currency exchange rates or automatic conversions.
- Category-specific granular budgets (the focus is on a single global monthly budget).
- End-to-end browser testing using Playwright/Cypress (deferred until the core integration seams are proven stable).
- Cloud deployment configurations (e.g., Docker, AWS, Heroku) as the initial focus is local usage.

## Further Notes

- The `ready-for-agent` label is conceptually applied. As this project currently resides locally without a connected remote issue tracker, this PRD will serve as the source of truth in `docs/PRD.md`.
