import {Component, effect, ElementRef, inject, Renderer2, ViewChild} from '@angular/core';
import {Button} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ProgressBar} from 'primeng/progressbar';

@Component({
  selector: 'app-login',
  imports: [
    Button,
    FormsModule,
    InputText,
    ProgressBar
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  @ViewChild('container') container!: ElementRef;
  @ViewChild('signInContainer') signInContainer!: ElementRef;

  name: string | undefined;
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;

  showLoading: boolean = false;

  service = inject(AuthenticationService);

  logEffect = effect(() => {
    const user = this.service.user();
    if (user) {
      this.router.navigate(['/']);
    }
  });

  constructor(private renderer: Renderer2,
              private message: MessageService,
              private router: Router) {
    if (this.service.user()) {
      this.router.navigate(['/']);
    }
  }

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  signIn() {
    if (this.username && this.password) {
      this.showLoading = true;
      this.service.signIn(this.username, this.password);
    }

    this.sleep(2000).then(() => {
      this.showLoading = false;
    });
  }

  signUp() {
    if (this.username && this.email && this.password && this.name) {
      this.showLoading = true;
      this.service.signUp(this.name, this.email, this.username, this.password);
    } else {
      this.message.add({severity: 'error', summary: 'All fields are required'});
    }
  }

  changeOverlay(overlay: boolean) {
    if (overlay) {
      this.renderer.addClass(this.container.nativeElement, 'right-panel-active')
      this.renderer.addClass(this.signInContainer.nativeElement, 'vanish');
    } else {
      this.renderer.removeClass(this.container.nativeElement, 'right-panel-active');
      this.renderer.removeClass(this.signInContainer.nativeElement, 'vanish');
    }

    this.name = undefined;
    this.username = undefined;
    this.password = undefined;
  }

}
