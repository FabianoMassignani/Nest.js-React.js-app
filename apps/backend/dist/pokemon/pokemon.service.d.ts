import { IPokemonResponse } from './pokemon.interface';
export declare class PokemonService {
    getPokemon(limit: any, offset: any, type: any, noOfEvolutions: any): Promise<IPokemonResponse>;
    private extractSpeciesName;
    private getEvolutionSequence;
    private getNumberOfEvolutions;
    private getPokemonGeneric;
    private getPokemonSpecies;
}
