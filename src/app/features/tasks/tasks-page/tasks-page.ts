
import { TaskListComponent } from '../task-list/task-list';
import { TaskDetailsComponent } from '../task-details/task-details';
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task';
import { Task } from '../../../core/models/task.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TaskListComponent, TaskDetailsComponent],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss'
  
})
export class TasksPage implements OnInit {
  today = new Date().toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
});

  // Connect our service
  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Read task data from the service
  tasks = this.taskService.tasks;
  loading = this.taskService.loading;
  overdueCount = this.taskService.overdueCount;

  // Local UI state
  searchText = signal('');
  selectedStatus = signal<'All' | 'Open' | 'Done'>('All');
  compactView = signal(false);
  selectedTaskId = signal<number | null>(1);

  // Filter tasks based on search and status
  filteredTasks = computed(() => {
    const search = this.searchText().toLowerCase();
    const status = this.selectedStatus();

    return this.tasks().filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search);

      const matchesStatus =
        status === 'All' || task.status === status;

      return matchesSearch && matchesStatus;
    });
  });

  // Get selected task details
  selectedTask = computed(() =>
    this.tasks().find(task => task.id === this.selectedTaskId()) ?? null
  );

  // Dashboard calculations
  totalTasks = computed(() => this.tasks().length);

  openTasks = computed(() =>
    this.tasks().filter(task => task.status === 'Open').length
  );

  completedTasks = computed(() =>
    this.tasks().filter(task => task.status === 'Done').length
  );

  ngOnInit() {
  // Restore search text from URL
  this.searchText.set(
    this.route.snapshot.queryParamMap.get('q') ?? ''
  );

  // Load tasks only if they are not already loaded
  if (this.taskService.tasks().length === 0) {
    this.taskService.loadTasks();
  }
}

  // Update search and URL
  onSearch(value: string) {
    this.searchText.set(value);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: value || null },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  // Change selected status tab
  changeStatus(status: 'All' | 'Open' | 'Done') {
    this.selectedStatus.set(status);
  }

  // Toggle compact view
  toggleCompact() {
    this.compactView.update(value => !value);
  }

  // Select a task
  selectTask(task: Task) {
    this.selectedTaskId.set(task.id);
  }

  // Mark selected task as done
  markSelectedAsDone() {
    const task = this.selectedTask();

    if (task) {
      this.taskService.markAsDone(task.id);
    }
  }
  editTask(id: number) {
  this.router.navigate(['/tasks', id, 'edit']);
}
taskServiceMarkDone(id: number) {
  this.taskService.markAsDone(id);
}
}
