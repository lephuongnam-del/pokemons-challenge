import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pokemonPageComponent } from '../pokemonPage/pokemonPage.component';
import { PokemonPageService } from './pokemon-page.service';

const routes: Routes = [{ path: '', component: pokemonPageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [pokemonPageComponent],
  providers: [PokemonPageService]
})
export class pokemonPageModule {}
