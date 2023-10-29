import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokedexService } from 'src/app/shared/service/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent {
  pokemon:any;
constructor( private route: ActivatedRoute,
  private pokedexservice: PokedexService){

}
ngOnInit() {
  if (this.pokedexservice.pokemon) {
    this.pokemon = this.pokedexservice.pokemon;
  } else {
    this.pokemon = history.state.pokemon;
    this.pokedexservice.pokemon = this.pokemon;
  }

  const pokemons = sessionStorage.getItem('pokemon');
  if (pokemons) {
    this.pokemon = JSON.parse(pokemons);
  }
}

navigateToProfile(pokemon: any) {
  this.pokedexservice.pokemon = pokemon;

}
}
