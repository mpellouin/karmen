import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { PokeCard } from './types/PokeCard';
import { Pokemon } from './types/Pokemon';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('pokemons/:id')
  async getPokemons(@Param('id') id: number): Promise<PokeCard[]> {
    const pokes = await this.appService.getPokemons(id);
    return pokes;
  }

  @Get('pokemon/:id')
  async getPokemon(@Param('id') id: number): Promise<Pokemon> {
    const poke = await this.appService.getPokemonDataFromId(id);
    return poke;
  }
}
