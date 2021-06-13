import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, of } from 'rxjs';
import { switchMap, takeUntil, tap, map } from 'rxjs/operators';
import { Store } from '../../../abtract/store';
import { SimplifiedPokemon } from '../../../models/pokemon';
import { BackendService } from '../../../services/backend.service';

export class PokemonDetailState {
  id: string = '';
  simplifiedPokemon: SimplifiedPokemon = {
    name: '',
    ability: '',
    hiddenAbility: '',
    image: '',
    stats: [],
    type: ''
  };
}

@Injectable()
export class PokemonDetailService extends Store<PokemonDetailState>
  implements OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  constructor(
    private backEndServer: BackendService
  ) {
    super(new PokemonDetailState());
    // this.initPokemon();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPokemonDetail(id: string) {
    this.backEndServer
      .getPokemonDetail(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((p: SimplifiedPokemon) => {
        this.setState({
          ...this.getState,
          id: id,
          simplifiedPokemon: p
        });
      });
  }
}
