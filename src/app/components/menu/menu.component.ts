import {Component, signal} from '@angular/core';
import {Drawer} from "primeng/drawer";
import {Button} from 'primeng/button';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {User} from '../../models/user';
import {Avatar} from 'primeng/avatar';
import {Tooltip} from 'primeng/tooltip';
import {Menu} from 'primeng/menu';
import {Badge} from 'primeng/badge';
import {MenuItem, MenuItemCommandEvent} from 'primeng/api';
import {Router} from '@angular/router';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [
    Drawer,
    Button,
    Avatar,
    Tooltip,
    Badge,
    Menu,
    ToggleSwitch,
    FormsModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  visible: boolean = false;

  user: User | null = null;

  items: MenuItem[] = [];

  loginItem: MenuItem;
  noAuthItems: MenuItem[] = [];
  authItems: MenuItem[] = [];

  isDarkMode = signal(false);

  constructor(private auth: AuthenticationService,
              private router: Router) {
    const theme = localStorage.getItem('theme');
    this.isDarkMode.set(theme == 'dark');

    this.loginItem = {
        label: 'Account',
        items: [
          {
            label: 'Login',
            icon: 'pi pi-sign-in',
            command: ()=>  {
              this.visible = false;
              this.router.navigate(['/login']);
            }
          }
        ]
      };

    this.noAuthItems = [
      {
        label: 'General',
        items: [
          {
            label: 'Sets',
            icon: 'pi pi-book',
            command: () => {
              this.visible = false;
              this.router.navigate(['/']);
            }
          },
          // {
          //   label: 'Trades',
          //   icon: 'pi pi-arrow-right-arrow-left',
          //   routerLink: '/trades',
          //   command: () => {
          //     this.visible = false;
          //     this.router.navigate(['/trades'])
          //   }
          // },
          // {
          //   label: 'Market',
          //   icon: 'pi pi-wallet',
          //   command: () => {
          //     this.visible = false;
          //     this.router.navigate(['/market'])
          //   }
          //}
        ]
      }
    ];

    this.authItems = [
      {
        label: 'Your Account',
        items: [
          {
            label: 'Collections',
            icon: 'pi pi-heart',
            command: () => {
              this.visible = false;
              this.router.navigate(['/collections/' + this.user?.id])
            }
          },
          {
            label: 'Wishlists',
            icon: 'pi pi-sparkles',
            command: () => {
              this.visible = false;
              this.router.navigate(['/wishlists/' + this.user?.id])
            }
          }
        ]
      }
    ]
  }

  openMenu() {
    this.visible = true;
  }

  loadNoUserMenu() {
    this.items = [];
    this.items.push(this.loginItem);
    this.noAuthItems.forEach(item => {
      this.items.push(item);
    });
  }

  loadUserMenu() {
    this.items = [];
    this.noAuthItems.forEach(item => {
      this.items.push(item);
    });
    this.authItems.forEach(item => {
      this.items.push(item);
    });
  }

  loadUser(): User | null {
    if (this.user == null) {
      this.user = this.auth.getUser();
    }

    this.user != null ? this.loadUserMenu() : this.loadNoUserMenu();
    return this.user;
  }

  loadIcon() {
    if (this.isMobileDevice())
      return 'pi pi-window-maximize';
    return 'pi pi-arrow-right';
  }

  isMobileDevice(): boolean {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // Regular expression to detect common mobile device keywords in the user agent string
    const mobileRegex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|rim)|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;

    // Regular expression to detect common tablet device keywords in the user agent string
    const tabletRegex = /android|ipad|playbook|silk/i;

    // Check for touch support
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Combine user agent and touch support checks
    return (mobileRegex.test(userAgent) || tabletRegex.test(userAgent)) && hasTouchScreen;
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('dark');
    this.isDarkMode.set(!this.isDarkMode());
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }
}
