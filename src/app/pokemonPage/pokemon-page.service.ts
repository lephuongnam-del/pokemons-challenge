import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/dist/types';
import { Store } from '../abtract/store';
import { SimplifiedPokemon } from '../models/pokemon';

export class pokemonState {
  pokemon: SimplifiedPokemon = {
    name: '',
    ability: '',
    hiddenAbility: '',
    image: '',
    stats: [],
    type: ''
  };
}

@Injectable()
export class PokemonPageService extends Store<pokemonState>
  implements OnDestroy {
  private readonly onDestroy$: Subject<void> = new Subject<void>();
  constructor() {
    super(new pokemonState());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
