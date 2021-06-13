import { Injectable } from '@angular/core';
import { Store } from '../abtract/store';
import { USER_LEGACY } from '../constants/key';
import { User } from '../models/user';

export class UserState {
  user: User = {
    name: '',
    likes: 0,
    dislikes: 0
  };
}
@Injectable()
export class UserService extends Store<UserState> {
  constructor() {
    super(new UserState());
  }

  public likes() {
    const user = {
      ...this.getState.user,
      likes: this.getState.user.likes + 1
    };
    sessionStorage.setItem(USER_LEGACY, JSON.stringify(user));

    const u = JSON.parse(sessionStorage.getItem(USER_LEGACY));
    this.setState({
      ...this.getState,
      user: u
    });
  }

  public dislikes() {
    const user = {
      ...this.getState.user,
      dislikes: this.getState.user.dislikes + 1
    };

    sessionStorage.setItem(USER_LEGACY, JSON.stringify(user));

    const u = JSON.parse(sessionStorage.getItem(USER_LEGACY));
    this.setState({
      ...this.getState,
      user: u
    });
  }
}
