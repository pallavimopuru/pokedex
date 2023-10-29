import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  filteredPokemonDetails: any[] = [];

  first: number = 0;

  rows: number = 10;
  search: any;
  searchText: any;

  constructor(private pokedexService: PokedexService,private router:Router) {}

  ngOnInit() {
    this.pokedexService.getpokemans().subscribe((res: any) => {
      this.pokemon = res.results; // Get the first Pokémon for demonstration
      // console.log(this.pokemon);
      this.getAllFormDetails(); // Assuming you have an "id" property in your Pokémon data
      this.applySearchFilter();
   
    });
  }

  getAllFormDetails() {
    this.pokemon.forEach((element: any) => {
      // console.log(element);

      this.pokedexService
      .getPokemonDetailsAbility(element?.url)
      .subscribe((ability: any) => {
        if (ability) {
          const height = ability.height; // Access the "height" property
          const id=ability.id;
          this.pokedexService
            .getPokemonDetailsForms(ability?.forms[0]?.url)
            .subscribe((formDetails: any) => {
              if (formDetails) {
                let obj = {
                  pokemonName: formDetails.pokemon.name,
                  pokemonImg: formDetails.sprites.back_default,
                  pokemonHeight: height, // Include the "height" property in your object
                  pokemonId:id
                };
                this.pokemonDetails.push(obj);
              }
            });
        }
      });
 
    
    
    
    });
  }
  applySearchFilter() {
    if (this.search) {
      this.filteredPokemonDetails = this.pokemonDetails.filter((pokemon:any) => {
        // Convert both the name and ID to lowercase for a case-insensitive search
        const searchValue = this.search.toLowerCase();
        const pokemonName = pokemon.pokemonName.toLowerCase();
        const pokemonId = pokemon.pokemonId.toString(); // Convert ID to a string
  
        // Check if the search value is present in either the name or ID
        return pokemonName.includes(searchValue) || pokemonId.includes(searchValue);
      });
    } else {
      // If the search input is empty, show all Pokémon
      this.filteredPokemonDetails = this.pokemonDetails;
    }
  }

  onclickimg(){
    this.router.navigateByUrl('/pokedex');
    // After setting details in pokemonDetails

  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
}

}
