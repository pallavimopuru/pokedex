import { Component } from '@angular/core';
import { PokedexService } from 'src/app/shared/service/pokedex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  pokemonDetails: any = [];
  pokemons: any;
  pokemon: any = [];
  spriteUrl: string = '';
  currentPage: number = 1;

  first: number = 0;

  rows: number = 10;
  search: any;
  searchText: any;

  constructor(private pokedexService: PokedexService) {}

  ngOnInit() {
    this.pokedexService.getpokemans().subscribe((res: any) => {
      this.pokemon = res.results; // Get the first Pokémon for demonstration
      // console.log(this.pokemon);
      this.getAllFormDetails(); // Assuming you have an "id" property in your Pokémon data
    });
  }

  getAllFormDetails() {
    this.pokemon.forEach((element: any) => {
      // console.log(element);

      this.pokedexService
        .getPokemonDetailsAbility(element?.url)
        .subscribe((ability: any) => {
          //  console.log(ability);
          if (ability) {
            this.pokedexService
              .getPokemonDetailsForms(ability?.forms[0]?.url)
              .subscribe((formDetails: any) => {
                console.log(formDetails);
                if (formDetails) {
                  let obj = {
                    pokemonName: formDetails.pokemon.name,
                    pokemonImg: formDetails.sprites.back_default,
                  };
                  this.pokemonDetails.push(obj);
                }
              });
          }
        });
    });
  }
  get filteredPokemon() {
    return this.pokemonDetails.filter((pokemon:any) =>
      pokemon.pokemonName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
}

}
