
import { Component, inject } from '@angular/core';
import { TaskService } from '../../core/services/task';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss'
})
export class TopBarComponent {

  private taskService = inject(TaskService);
  private userService = inject(UserService);

  // Read shared information
  userName = this.userService.userName;
  overdueCount = this.taskService.overdueCount;

}
