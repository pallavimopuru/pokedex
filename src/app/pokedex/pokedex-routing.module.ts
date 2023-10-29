import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/common/home/home.component';
import { PokedexComponent } from './components/common/pokedex/pokedex.component';
import { PokedexContainerComponent } from './components/pokedex-container/pokedex-container.component';

const routes: Routes = [
  {path:'',component:PokedexContainerComponent,children:[

    { path: 'home', component: HomeComponent },
    { path: 'pokedex', component: PokedexComponent },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home',
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: 'home',
    },
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexRoutingModule {}
