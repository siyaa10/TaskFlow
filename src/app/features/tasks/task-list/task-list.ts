
import { Component, input, output } from '@angular/core';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent {

  tasks = input.required<Task[]>();
  selectedTaskId = input<number | null>(null);
  compactView = input(false);

  taskSelected = output<Task>();

  selectTask(task: Task) {
    this.taskSelected.emit(task);
  }
}
