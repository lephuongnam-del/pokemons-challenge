import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pokemonPageComponent } from '../pokemonPage/pokemonPage.component';

const routes: Routes = [{ path: '', component: pokemonPageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [pokemonPageComponent],
  providers: []
})
export class pokemonPageModule {}
