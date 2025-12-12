import {Component, effect, ElementRef, inject, Renderer2, ViewChild} from '@angular/core';
import {Button} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    Button,
    FormsModule,
    InputText
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  @ViewChild('container') container!: ElementRef;
  @ViewChild('signInContainer') signInContainer!: ElementRef;

  username: string | undefined;
  password: string | undefined;

  name: string | undefined;
  service = inject(AuthenticationService);

  logEffect = effect(() => {
    const user = this.service.user();
    if (user) {
      this.router.navigate(['/']);
    }
  });

  constructor(private renderer: Renderer2,
              private router: Router) {
    console.log(this.service.user());
    if (this.service.user()) {
      this.router.navigate(['/']);
    }
  }

  signIn() {
    if (this.username && this.password) {
      this.service.signIn(this.username, this.password);
    }
  }

  signUp() {
    if (this.username && this.password && this.name) {
      this.service.signUp(this.name, this.username, this.password);
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
