
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userName = signal(
    localStorage.getItem('taskflow-username') || 'Alex Morgan'
  );

  readonly userName = this._userName.asReadonly();

  updateUserName(name: string) {
    this._userName.set(name);
    localStorage.setItem('taskflow-username', name);
  }
}
