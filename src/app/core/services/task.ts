
import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // Original task storage - only this service can modify it
  private _tasks = signal<Task[]>([]);

  // Public read-only access
  readonly tasks = this._tasks.asReadonly();

  // Loading status
  private _loading = signal(false);
  readonly loading = this._loading.asReadonly();
  private loadPromise: Promise<void> | null = null;

  // Calculate overdue tasks automatically
  readonly overdueCount = computed(() => {
    const today = new Date().toISOString().split('T')[0];

    return this._tasks().filter(task =>
      task.status === 'Open' && task.dueDate < today
    ).length;
  });

  // Sample task data
  private mockTasks: Task[] = [
    {
      id: 1,
      title: 'Complete Angular Assignment',
      description: 'Finish the TaskFlow state management project.',
      dueDate: '2026-11-24',
      status: 'Open',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Prepare SQL Notes',
      description: 'Revise joins and database queries.',
      dueDate: '2026-11-26',
      status: 'Open',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Review Java Concepts',
      description: 'Practice inheritance and polymorphism.',
      dueDate: '2026-11-22',
      status: 'Done',
      priority: 'Medium'
    },
    {
      id: 4,
      title: 'Update Portfolio',
      description: 'Add recent projects to the portfolio.',
      dueDate: '2026-11-28',
      status: 'Open',
      priority: 'Low'
    },
    {
      id: 5,
      title: 'Complete Documentation',
      description: 'Write project setup and implementation details.',
      dueDate: '2026-11-23',
      status: 'Open',
      priority: 'High'
    },
    {
      id: 6,
      title: 'Practice TypeScript',
      description: 'Understand interfaces, types and functions.',
      dueDate: '2026-11-27',
      status: 'Open',
      priority: 'Medium'
    },
    {
      id: 7,
      title: 'Check GitHub Repository',
      description: 'Review commits and project files.',
      dueDate: '2026-11-21',
      status: 'Done',
      priority: 'Low'
    },
    {
      id: 8,
      title: 'Learn Angular Routing',
      description: 'Practice navigation and route parameters.',
      dueDate: '2026-11-25',
      status: 'Open',
      priority: 'High'
    },
    {
      id: 9,
      title: 'Prepare Project Demo',
      description: 'Get the application ready for presentation.',
      dueDate: '2026-11-30',
      status: 'Open',
      priority: 'High'
    },
    {
      id: 10,
      title: 'Review Previous Tasks',
      description: 'Check completed work and pending activities.',
      dueDate: '2026-11-20',
      status: 'Done',
      priority: 'Low'
    }
  ];

  // Load tasks with a simulated API delay
  

loadTasks(): Promise<void> {

  // If tasks are already loaded, do nothing
  if (this._tasks().length > 0) {
    return Promise.resolve();
  }

  // If loading is already happening, reuse the same request
  if (this.loadPromise) {
    return this.loadPromise;
  }

  this._loading.set(true);

  this.loadPromise = new Promise(resolve => {
    setTimeout(() => {
      this._tasks.set(this.mockTasks);
      this._loading.set(false);
      this.loadPromise = null;
      resolve();
    }, 1000);
  });

  return this.loadPromise;
}

  // Mark a task as completed
  markAsDone(id: number) {
    this._tasks.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, status: 'Done' }
          : task
      )
    );
  }

  // Update an existing task
  updateTask(updatedTask: Task) {
    this._tasks.update(tasks =>
      tasks.map(task =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  }
}
