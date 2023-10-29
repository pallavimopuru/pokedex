import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  types:any[]=[];
  type:any={}
  first: number = 0;

  rows: number = 10;
  search: any;
  searchText: any;
  routeReuseStrategy: any;

  constructor(private pokedexService: PokedexService,private router:Router) {}

  ngOnInit() {
    this.pokedexService.getpokemans().subscribe((res: any) => {
      this.pokemon = res.results; // Get the first Pokémon for demonstration
      // console.log(this.pokemon);
      this.getAllFormDetails(); 
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
          const weight=ability.weight;
          const Base_experience=ability.base_experience;
          // const Abilities=ability.abilities[0].ability.name;
          const Abilities = ability.abilities.map((abilityInfo: any) => abilityInfo.ability.name);
          const Moves = ability.moves.map((moveInfo:any)=>moveInfo.move.name)
          this.pokedexService
            .getPokemonDetailsForms(ability?.forms[0]?.url)
            .subscribe((formDetails: any) => {
              if (formDetails) {
                const types = formDetails.types.map((type: any) => type.type.name); 
                let obj = {
                  pokemonName: formDetails.pokemon.name,
                  pokemonImg: formDetails.sprites.back_default,
                  pokemonVersion:formDetails.version_group.name,
                  pokemontypes: types, // Store all types
                  pokemonOrder:formDetails.order,
                  pokemonIsBattleOnly:formDetails.is_battle_only,
                  pokemonHeight: height, // Include the "height" property in your object
                  pokemonId:id,
                  pokemonWeight:weight,
                  pokemonBase_experience:Base_experience,
                  pokemonBaseAbilities:Abilities,
                  pokemonMoves:Moves
                  
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

  navigateToProfile(pokemon: any) {
    sessionStorage.setItem('pokemon',JSON.stringify(pokemon));
    this.router.navigate(['/pokedex']);
    // this.router.events.subscribe((event: any) => {
    //   if (event instanceof NavigationEnd) {
    //     this.routeReuseStrategy.shouldReuseRoute = function() {
    //       return false;
    //     };
    //   }
    // });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
}

}
