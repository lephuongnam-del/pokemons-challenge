import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SimplifiedPokemon } from '../models/pokemon';
import { PokemonPageService } from '../pokemonPage/pokemon-page.service';
import { Observable } from 'rxjs';
@Component({
  selector: `pokemon-page`,
  template: `
    <ng-container *ngIf="(pokemon$ | async) as pokemon; else loading">
      <ul class="list-group">
        <li class="list-item">
          <a class="user-link">
            <img [src]="pokemon?.image" />
            <span>
              <p>
                <span class="list-item-heading">Name</span>: {{ pokemon?.name }}
              </p>
              <p>
                <span class="list-item-heading">attribute</span>: pokemon
                attribute
              </p>
            </span>
          </a>
        </li>
      </ul>
    </ng-container>
    <ng-template #loading>
      loading...
    </ng-template>
  `,
  styles: [
    `
      .user-link {
        display: flex;
        padding: 10px;
      }
      .user-link > span {
        padding: 10px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class pokemonPageComponent {
  pokemon$: Observable<SimplifiedPokemon> = this.pokemonPage.state$;
  constructor(private pokemonPage: PokemonPageService) {}
}
