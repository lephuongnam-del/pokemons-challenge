import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../abtract/store';
import { POKEMON_PAGING, USER_LEGACY } from '../constants/key';
import { User } from '../models/user';

export class UserState {
  user: User = {
    name: '',
    likes: 0,
    dislikes: 0
  };
}

@Injectable()
export class AuthService extends Store<UserState> implements OnInit {
  currentUser: User = {
    name: 'yb',
    likes: 0,
    dislikes: 0
  };

  constructor(private router: Router) {
    super(new UserState());
    this.initUser();
  }
  public ngOnInit() {}

  private initUser() {
    if (sessionStorage.getItem(USER_LEGACY)) {
      const user = JSON.parse(sessionStorage.getItem(USER_LEGACY));
      this.setState({
        ...this.getState,
        user: user
      });
    }
  }

  login() {
    const user = this.currentUser;
    this.setState({
      ...this.getState,
      user
    });
    sessionStorage.setItem(USER_LEGACY, JSON.stringify(user));

    this.router.navigate(['/pokemons']);
  }

  logout() {
    sessionStorage.removeItem(USER_LEGACY);
    sessionStorage.removeItem(POKEMON_PAGING);
    this.router.navigate(['/not-auth']);
  }

  isAuthenticated(): boolean {
    const isLoggedIn = !!sessionStorage.getItem(USER_LEGACY);
    return Boolean(isLoggedIn);
  }

  likes() {
    const user = {
      ...this.getState.user,
      likes: this.getState.user.likes + 1
    };
    console.log('aaaaaaaaaaaaaaaaaa', user);
    sessionStorage.setItem(USER_LEGACY, JSON.stringify(user));
    this.setState({
      ...this.getState,
      user: user
    });
  }

  dislikes() {
    const user = {
      ...this.getState.user,
      dislikes: this.getState.user.dislikes + 1
    };
    console.log('aaaaaaaaaaaaaaaaaa', user);
    sessionStorage.setItem(USER_LEGACY, JSON.stringify(user));
    this.setState({
      ...this.getState,
      user: user
    });
  }
}
