import { PokemonService } from './pokemon.service';
import { PokemonQueryParams } from './pokemon.validator';
import { IPokemonResponse } from './pokemon.interface';
export declare class PokemonController {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    getPokemon(pokemonQueryParams: PokemonQueryParams): Promise<IPokemonResponse>;
}
