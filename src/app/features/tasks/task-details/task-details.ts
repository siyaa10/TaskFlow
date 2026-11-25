
import { Component, input, output } from '@angular/core';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss'
})
export class TaskDetailsComponent {

  task = input<Task | null>(null);

  markDone = output<number>();

  editTask = output<number>();
}
