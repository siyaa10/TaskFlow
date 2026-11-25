
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class SettingsComponent {

  private userService = inject(UserService);

  userName = this.userService.userName;

  editableUserName = this.userService.userName();

  saveUserName() {
    const name = this.editableUserName.trim();

    if (name) {
      this.userService.updateUserName(name);
      alert('Username updated successfully!');
    }
  }
}
