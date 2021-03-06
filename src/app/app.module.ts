import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthenticatedComponent } from './components/not-authenticated/not-authenticated.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'pokemons',
        pathMatch: 'full'
      },
      {
        path: 'pokemons',
        canLoad: [AuthenticatedGuard],
        loadChildren: () =>
          import('./pokemons/pokemons.module').then(m => m.PokemonsModule)
      },
      {
        path: 'pokemonpage',
        canLoad: [AuthenticatedGuard],
        loadChildren: () =>
          import('./pokemonPage/pokemonPage.module').then(
            x => x.pokemonPageModule
          )
      }
    ]
  },
  {
    path: 'not-auth',
    component: NotAuthenticatedComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  declarations: [AppComponent, NavbarComponent],
  bootstrap: [AppComponent],
  providers: [AuthService, UserService]
})
export class AppModule {}
