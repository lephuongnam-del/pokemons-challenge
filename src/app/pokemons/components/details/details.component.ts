import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {  map, tap } from 'rxjs/operators';
import { SimplifiedPokemon } from '../../../models/pokemon';
import { AuthService } from '../../../services/auth.service';
import { PokemonDetailService, PokemonDetailState } from './pokemon-detail.service';

@Component({
  selector: 'pokemon-details',
  template: `
    <div class="flex gap-4 items-center justify-center">
      <button (click)="prevId()">
        <<
      </button>
      <pokemon-card *ngIf="(pokemon$ | async) as pokemon ; else loading" [pokemon]="pokemon"></pokemon-card>
      <button (click)="nextId()">
        >>
      </button>
    </div>

    <div class="flex w-1/3 px-4 justify-between items-center">
      <button class="border border-gray-600 px-4 py-2 rounded" (click)="like()">
        Like
      </button>
      <button
        class="border border-gray-600 px-4 py-2 rounded"
        (click)="dislike()"
      >
        Dislike
      </button>
      <ng-template #loading>
      loading...
  </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        height: calc(100% - 5rem);
      }
    `
  ],
  providers: [PokemonDetailService]
})
export class DetailsComponent implements OnInit {
  @HostBinding('class') hostClass =
    'flex flex-col gap-4 items-center justify-center';

public pokemon$: Observable<SimplifiedPokemon> =
this.pokemonDetailService.state$.pipe(
  tap(x=>console.log('xxxxxxxxxxxxxxx',x)),
  map((p:PokemonDetailState) => {
    return {...p?.simplifiedPokemon}
  })
)

constructor(private pokemonDetailService: PokemonDetailService, 
            private route: ActivatedRoute, private router: Router,
            private auth:AuthService) {}
id ;
ngOnInit(){
      this.route.params.pipe(
        map((x:any)=>x.id)
      ).subscribe( id =>{
        this.pokemonDetailService.getPokemonDetail(id);
        this.id = id;
      })

}

  nextId() {
    // go to next id
    this.router.navigate(['/pokemons', ++this.id])
  }

  prevId() {
    // go to prev id
    this.router.navigate(['/pokemons', --this.id])
  }

  like() {
    // like
    this.auth.likes();
  }

  dislike() {
    // dislike
    this.auth.dislikes()
  }
}
