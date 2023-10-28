import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexRoutingModule } from './pokedex-routing.module';
import { HomeComponent } from './components/common/home/home.component';
import { PokedexComponent } from './components/common/pokedex/pokedex.component';
import { PokedexContainerComponent } from './components/pokedex-container/pokedex-container.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';


@NgModule({
  declarations: [
    HomeComponent,
    PokedexComponent,
    PokedexContainerComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PokedexRoutingModule
  ]
})
export class PokedexModule { }
