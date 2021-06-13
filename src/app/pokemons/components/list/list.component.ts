import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable,Subject } from 'rxjs';
import {map,debounceTime, takeUntil,distinctUntilChanged, tap} from 'rxjs/operators'
import type { PaginatorState } from '../../../components/paginator/paginator.component';
import { PaginatedPokemon,Pokemon } from '../../../models/pokemon';
import { ListService } from './list.service';



@Component({
  selector: 'pokemon-list',
  template: `
  <ng-container *ngIf=" (pokemon$ | async) as pokemon; else loading">
    <paginator *ngIf= "(paginator$ | async) as paginator; else loading "
      [currentPage]="paginator?.page"
      [rowsPerPageOptions]="[10, 20, 40, 80]"
      [rows]="paginator?.rows"
      [totalRecords]="pokemon.count"
      (onPageChange)="onPageChanged($event)"
    ></paginator>
    <input
      type="text"
      class="w-2/4 p-2 rounded border border-gray-600"
      placeholder="Filter by pokemon name..."
      [formControl]="query"
    />
    <data-table [isLoading]="pokemon?.isLoading" [data]="pokemon?.results"></data-table>

  </ng-container>
  <ng-template #loading>
      loading...
  </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnDestroy  {

  query = new FormControl('');
  private destroy$: Subject<void> = new Subject<void>();

  pokemon$: Observable<PaginatedPokemon & {isLoading: boolean} > = this.pokemonService.state$;

 paginator$ : Observable<PaginatorState> = this.pokemonService.state$.pipe(
   map((x:any) => x.paginatorState));
   
  constructor(private pokemonService: ListService) {
    this.search();
  }
  onPageChanged(paginatorState: PaginatorState) {
 
    this.pokemonService.onPageChanged(paginatorState);
    this.query.setValue('');
   
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  search(){
    this.query.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe((query:string) => {
      this.pokemonService.search(query)

    })
  }


 
}
