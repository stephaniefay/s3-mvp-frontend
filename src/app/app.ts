import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuComponent} from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MyWish');

  constructor() {
    const theme = localStorage.getItem('theme');
    const element = document.querySelector('html');
    if (theme == 'dark') {
      element?.classList.toggle('dark');
    }
  }
}
