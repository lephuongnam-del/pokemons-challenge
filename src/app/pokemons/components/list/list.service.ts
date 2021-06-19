import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { PaginatedPokemon, Pokemon } from '../../../models/pokemon';
import { Store } from '../../../abtract/store';
import { PaginatorState } from '../../../components/paginator/paginator.component';
import { takeUntil, tap,map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { POKEMON_PAGING } from '../../../constants/key';
export class PokemonsState {
  results: Pokemon[] = [];
  count: number = 0;
  next: string = '';
  previous: string = '';
  isLoading: boolean = false;
  rawResults: Pokemon[] = [];
  paginatorState: PaginatorState = {
    page: 1,
    pageCount: 5,
    rows: 20,
    first: 20
  };
}
@Injectable()
export class ListService extends Store<PokemonsState> {
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(private readonly backendService: BackendService) {
    super(new PokemonsState());
    this.initPokemons();
    
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  initPokemons() {
    if (!!sessionStorage.getItem(POKEMON_PAGING)) {
      const paginator = JSON.parse(sessionStorage.getItem(POKEMON_PAGING));
    }
    this.getPokemons();
  }

  getPokemons() {
    this.setState({
      ...this.getState,
      isLoading: true
    });

    this.backendService
      .getPokemons(
        this.getState.paginatorState.rows,
        this.getState.paginatorState.first - this.getState.paginatorState.rows
      )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((p: PaginatedPokemon) => {
        this.setState({
          ...this.getState,
          count: p.count,
          next: p.next,
          results: p.results,
          previous: p.previous,
          isLoading: false,
          rawResults: p.results
        });
      });
  }

  onPageChanged(paginatorState: PaginatorState) {
    this.setState({ ...this.getState, paginatorState });
    sessionStorage.setItem(
      POKEMON_PAGING,
      JSON.stringify(this.getState.paginatorState)
    );

    this.getPokemons();
  }

  search(query: string) {
    this.setState({
      ...this.getState,
      results: this.getState.rawResults.filter((p: Pokemon) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    });
  }
}
