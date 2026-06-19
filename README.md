# Personal Expense Tracker

A full-stack web application designed to help you effortlessly track your daily expenses, manage monthly budgets, and visualize your spending habits over time.

## 🌟 Features

*   **📊 Visual Dashboard:** Interactive bar charts and data tables to analyze daily and monthly spending trends (powered by Recharts).
*   **💰 Monthly Budgeting:** Set a spending limit for specific months. The dashboard displays a dynamic "Remaining Budget" calculation.
*   **🏷️ Custom Categories:** Group your expenses in a way that makes sense to you by creating dynamic, user-defined categories.
*   **🌍 Global Currency:** Set a preferred global currency code (e.g., USD, EUR, GBP) that formats all monetary values across the application.
*   **🔒 Secured API:** Protects your financial data with Spring Security (Basic Auth).
*   **💾 Local Persistence:** Utilizes a file-based H2 database, ensuring your data is safely saved locally and survives server restarts.

## 🛠️ Tech Stack

### Frontend
*   **React** (Bootstrapped with Vite)
*   **TypeScript** for type safety
*   **Tailwind CSS** for utility-first styling
*   **React Router** for seamless navigation
*   **Recharts** for data visualization
*   **Axios** for API communication

### Backend
*   **Java 17**
*   **Spring Boot 3** (Spring Web, Spring Data JPA, Spring Security)
*   **H2 Database** (File-based mode)

---

## 🚀 How to Run Locally

You will need two separate terminal windows to run the frontend and backend simultaneously.

### Prerequisites
*   **Java 17** or higher
*   **Node.js** (v18+ recommended)
*   **npm**

### 1. Start the Spring Boot Backend
Open your first terminal and navigate to the `backend` directory:
```bash
cd backend
./mvnw clean install -DskipTests
./mvnw spring-boot:run
```
*The backend will start on `http://localhost:8080`. (Default credentials: `admin` / `admin`)*

### 2. Start the React Frontend
Open a second terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will start on `http://localhost:5173`. Open this URL in your browser.*

---

## 📄 Documentation

For detailed technical specifications, user stories, and architectural decisions, please refer to the **Product Requirements Document** located at [`docs/PRD.md`](docs/PRD.md).