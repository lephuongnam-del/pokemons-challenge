import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PaginatorModule } from '../components/paginator/paginator.module';
import { PokemonCardModule } from '../components/pokemon-card/pokemon-card.module';
import { TableModule } from '../components/table/table.module';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';
import { ListService } from './components/list/list.service';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: ':id',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginatorModule,
    TableModule,
    PokemonCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListComponent, DetailsComponent],
  providers: [ListService]
})
export class PokemonsModule {}
