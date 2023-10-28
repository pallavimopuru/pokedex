import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/common/home/home.component';
import { PokedexComponent } from './components/common/pokedex/pokedex.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'pokedex',component:PokedexComponent},
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexRoutingModule { }
