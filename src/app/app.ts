
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TopBarComponent } from './shared/top-bar/top-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TopBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
