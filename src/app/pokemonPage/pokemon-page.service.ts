import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '../abtract/store';
import { PaginatorState } from '../components/paginator/paginator.component';
import { SimplifiedPokemon, Stat } from '../models/pokemon';
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
   // console.log(this.getpokemons());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  // getpokemons() {
  //   this.backendService
  //     .getPokemons(
  //       this.getState.paginatorState.rows,
  //       this.getState.paginatorState.first - this.getState.paginatorState.rows
  //     )
  //     .pipe(takeUntil(this.onDestroy$))
  //     .subscribe((p:SimplifiedPokemon) => {

  //     })
  // }
}
