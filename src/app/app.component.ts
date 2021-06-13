import { Component } from '@angular/core';
import { PokemonDetailState } from './pokemons/components/details/pokemon-detail.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    console.log('xxx', new PokemonDetailState());
  }
}
