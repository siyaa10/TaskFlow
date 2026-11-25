# TaskFlow – Angular Task Management Application
**GitHub Repository:** https://github.com/siyaa10/TaskFlow
## 1. Project Overview

TaskFlow is a task management application developed using Angular and TypeScript. It allows users to manage tasks, search and filter tasks, view task details, edit task information, and track overdue tasks.

The application uses Angular Signals for state management and mock task data to simulate an API response.

## 2. Technologies Used

- Angular 22
- TypeScript
- HTML
- SCSS
- Angular Signals
- Reactive Forms
- Angular Router
- Local Storage

## 3. Features

- Dashboard with task statistics.
- Mock task loading with a loading indicator.
- Search tasks with search persistence through URL query parameters.
- Filter tasks using All, Open and Done tabs.
- Compact view toggle.
- Select a task and view its details.
- Mark tasks as completed.
- Automatically update overdue task count.
- Edit tasks using reactive forms.
- Form validation and unsaved changes warning.
- Settings page with shared username.
- Username persistence using browser Local Storage.

## 4. Installation and Setup

### Prerequisites
- Node.js
- npm
- Angular CLI

### Steps to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/siyaa10/TaskFlow.git
   ```

2. Navigate into the project folder:

   ```bash
   cd taskflow
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   ng serve
   ```

5. Open the application:

   ```text
   http://localhost:4200/
   ```

### Build the Application

Run the following command to generate a production build:

```bash
ng build
```

## 5. State Management

The application uses Angular Signals to manage shared and component-level state.

### B. State Mapping Table

| Data | Kind | Where it lives | Why |
|---|---|---|---|
| Search text | URL | TasksPage component and URL query parameters | Keeps the search value available after refreshing or sharing the URL. |
| Selected status tab | Local UI | TasksPage component | Only the Tasks page needs this temporary filter selection. |
| Compact view on/off | Local UI | TasksPage component | Controls how the task list is displayed. |
| Task list from the API | Server | TaskService | The service owns the mock task data and simulates an API response with a delay. |
| Selected task | Local UI | TasksPage component | Stores the selected task ID and derives the selected task for the details panel. |
| Edit form has unsaved changes | Form | EditTaskComponent reactive form | Angular Reactive Forms tracks form values and dirty state. |
| Overdue task count | Derived | TaskService computed signal | It is calculated from the task list and updates automatically when task state changes. |
| User's name | Shared | UserService | A shared signal allows the top bar and Settings page to display the same username. |

### C. Code Review – State Management Problems

The supplied code-review example contains the following state management problems:

**1. Public writable signals**

The `tasks` and `overdueCount` signals are publicly accessible and writable. This allows components to modify service state directly.

**How TaskFlow avoids it:** The writable signals are private, and read-only versions are exposed using `asReadonly()`. Only service methods can update the state.

**2. Duplicate storage of derived data**

The example stores `overdueCount` separately even though it can be calculated from the task list. This can cause inconsistent values when tasks change.

**How TaskFlow avoids it:** The overdue count is calculated using a `computed()` signal based on the task list.

**3. Using effect() to copy signal values**

The TopBarComponent creates another signal and uses `effect()` to copy the overdue count from the service. This duplicates state unnecessarily.

**How TaskFlow avoids it:** The top bar reads the shared computed signal directly from TaskService instead of maintaining another copy.

## 6. Project Structure

```text
src/
└── app/
    ├── core/
    │   ├── models/
    │   └── services/
    ├── features/
    │   ├── tasks/
    │   │   ├── tasks-page/
    │   │   ├── task-list/
    │   │   └── task-details/
    │   ├── edit-task/
    │   └── settings/
    ├── shared/
    │   └── top-bar/
    ├── app.routes.ts
    ├── app.ts
    └── app.html
```

## 7. Notes

- This project uses mock task data; no backend API or database is connected.
- Task data is managed in the Angular service during the application session.
- The username is persisted using browser Local Storage.
- Search text is maintained through URL query parameters.
