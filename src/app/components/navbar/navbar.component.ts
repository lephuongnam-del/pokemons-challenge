import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { AuthService, UserState } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  template: `
    <nav>
      <h4>Angular Vietnam v{{ version }}</h4>
      <button *ngIf="isLoggedIn; else notLoggedIn" (click)="logOut()">
      <span *ngIf="(user$ | async) as user ; else loading">

       I am {{ user?.name }}, and I like {{ user?.likes }} and dislike
        {{ user?.dislikes }} pokemons / Log Out
      </span>
       
      </button>
      <ng-template #notLoggedIn>
        <button (click)="logIn()">Log In</button>
      </ng-template>
          <ng-template #loading>loading...</ng-template>
    </nav>

  `,
  styles: [
    `
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: hotpink;
        color: white;
      }

      h4 {
        margin: 0;
        font-size: 2rem;
      }

      button {
        background: transparent;
        outline: none;
        border: 1px solid;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        font-family: 'Source Sans Pro';
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  version = VERSION.full;
  isLoggedIn = false;

  user$: Observable<User> = this.auth.state$.pipe(
    map((u:UserState) => u?.user)
  )
  constructor(private auth: AuthService) {
   this.isLoggedIn= this.auth.isAuthenticated();
  }
  logIn() {
    // TODO: Please replace with a service call
    this.auth.login();
    this.isLoggedIn = true;
  }

  logOut() {
    // TODO: Please replace with a service call
    this.auth.logout();
    this.isLoggedIn = false;
  }
}
