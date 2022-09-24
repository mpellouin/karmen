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

  getPokemonsFromVersion(): Promise<Pokemon[]> {
    const list = this.httpService
      .get(`https://pokeapi.co/api/v2/pokemon?limit=151`).toPromise().then((response) => {
        return response.data.results;
      }).catch((e) => {
        throw new HttpException(e.response.data, e.response.status);
      });
    return list;
  }

  async getPokemons(): Promise<PokeCard[]> {
    const pokemons = await this.getPokemonsFromVersion();
    const pokeCards: PokeCard[] = [];
    let i = 1;
    for (const pokemon of pokemons) {
      const pokeCard = {
        id: i,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
      };
      pokeCards.push(pokeCard);
      i++;
    }
    return pokeCards;
  }
}
