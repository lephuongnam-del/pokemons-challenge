import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap,map } from 'rxjs/operators';
import { Store } from '../abtract/store';
import { PaginatorState } from '../components/paginator/paginator.component';
import {
PaginatedPokemon,
  PaginatedPokemonPage,
  SimplifiedPokemon,
  Stat
} from '../models/pokemon';
import { BackendService } from '../services/backend.service';

export class pokemonState {
  name: string = ' ';
  ability: string = ' ';
  hiddenAbility: string = ' ';
  image: string = ' ';
  stats: Stat[] = [];
  type: string = ' ';

  paginatorState: PaginatorState = {
    page: 1,
    pageCount: 5,
    rows: 20,
    first: 20
  };
}

@Injectable()
export class PokemonPageService extends Store<pokemonState>
  implements OnDestroy {
  private readonly onDestroy$: Subject<void> = new Subject<void>();
  constructor(private backendService: BackendService) {
    super(new pokemonState());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  // getpokemonPage() {
  //   console.log('aaaaaaaaaaaaaaaaaaaaaaa');
  //   this.backendService
  //   .getPokemonsPage()
  //   .pipe(
  //      map((P:PaginatedPokemon) => P.results[0]?.id ),
  //     takeUntil(this.onDestroy$)
  //   ).subscribe((P:PaginatedPokemon) => {

  //   }

  //   )
  // }
}
