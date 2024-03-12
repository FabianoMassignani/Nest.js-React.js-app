import { IPokemonResponse } from './pokemon.interface';
export declare class PokemonService {
    private extractSpeciesName;
    private getEvolutionSequence;
    private getNumberOfEvolutions;
    private getPokemonGeneric;
    private getPokemonSpecies;
    getPokemon(limit: any, offset: any, type: any, noOfEvolutions: any): Promise<IPokemonResponse>;
}
