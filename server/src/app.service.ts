import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { PokeCard } from './types/PokeCard';
import { Pokemon } from './types/Pokemon';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getPokemonDataFromId(id: number): Promise<Pokemon> {
    const list = this.httpService
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`).toPromise().then((response) => {
        return response.data;
      }).catch((e) => {
        throw new HttpException(e.response.data, e.response.status);
      });
    return list;
  }

  getPokemonsFromVersion(version: number): Promise<Pokemon[]> {
    const list = this.httpService
      .get(`https://pokeapi.co/api/v2/generation/${version}`).toPromise().then((response) => {
        return response.data.pokemon_species;
      }).catch((e) => {
        throw new HttpException(e.response.data, e.response.status);
      });
    return list;
  }

  getPokemonData(pokemonUrl: string): Promise<Pokemon> {
    const list = this.httpService
      .get(pokemonUrl).toPromise().then((response) => {
        return response.data;
      }).catch((e) => {
        throw new HttpException(e.response.data, e.response.status);
      });
    return list;
  }

  async getPokemons(id: number): Promise<PokeCard[]> {
    const pokemons = await this.getPokemonsFromVersion(id);
    const pokeCards: PokeCard[] = [];
    for (const pokemon of pokemons) {
      const pokemonData = this.getPokemonData(pokemon.url);
      const pokeCard = {
        id: (await pokemonData).id,
        name: (await pokemonData).name,
        image: "test",
        types: ["test"],
      };
      pokeCards.push(pokeCard);
    }
    return pokeCards;
  }
}
