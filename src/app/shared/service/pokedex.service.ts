import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../configs/url-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  constructor(private http: HttpClient) {}
getpokemans(){
  return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
}
getPokemonDetailsAbility(url: any): Observable<any> {
   
  return this.http.get(url);
}
getPokemonDetailsForms(url: any): Observable<any> {
   
  return this.http.get(url);
}


}
