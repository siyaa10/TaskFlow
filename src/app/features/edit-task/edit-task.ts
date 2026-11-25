
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../core/services/task';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.scss'
})
export class EditTaskComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);

  taskForm = this.fb.group({
    title: ['', Validators.required],
    dueDate: ['', Validators.required],
    status: ['Open', Validators.required]
  });

  taskId!: number;

  
async ngOnInit() {

  this.taskId = Number(this.route.snapshot.paramMap.get('id'));

  // Wait for tasks to load before finding the selected task
  await this.taskService.loadTasks();

  const task = this.taskService.tasks().find(
    item => item.id === this.taskId
  );

  if (task) {
    this.taskForm.patchValue({
      title: task.title,
      dueDate: task.dueDate,
      status: task.status
    });

    this.taskForm.markAsPristine();

  } else {
    alert('Task not found. Please return to the task list.');
    this.router.navigate(['/tasks']);
  }
}


  saveTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const existingTask = this.taskService.tasks().find(
      task => task.id === this.taskId
    );

    if (!existingTask) return;

    this.taskService.updateTask({
      ...existingTask,
      title: this.taskForm.value.title!,
      dueDate: this.taskForm.value.dueDate!,
      status: this.taskForm.value.status as 'Open' | 'Done'
    });

    this.taskForm.markAsPristine();

    alert('Task updated successfully!');

    this.router.navigate(['/tasks']);
  }

  canLeave(): boolean {
    if (this.taskForm.dirty) {
      return window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
    }

    return true;
  }

  cancelEdit() {
    this.router.navigate(['/tasks']);
  }
}
