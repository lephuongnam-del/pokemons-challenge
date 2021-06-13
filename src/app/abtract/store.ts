import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
  public state$: Observable<T>;
  private _state$: BehaviorSubject<T>;

  protected constructor(initState: T) {
    this._state$ = new BehaviorSubject(initState);
    this.state$ = this._state$.asObservable();
  }

  get getState(): T {
    return this._state$.getValue();
  }

  public setState(nextState: T) {
    this._state$.next(nextState);
  }
}
