import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { fetchData, isArrayWithNonZeroLength } from './pokemon.utils';
import {
  IPokemonResponse,
  IDetailedResult,
  IPokemonRawResponse,
  IPokemonSpeciesRawResponse,
} from './pokemon.interface';

@Injectable()
export class PokemonService {
  /**
   * Retrieves Pokemon data based on the provided parameters.
   * @param limit - The maximum number of Pokemon to retrieve.
   * @param offset - The offset for pagination.
   * @param type - The type of Pokemon to filter by.
   * @param noOfEvolutions - The number of evolutions to filter by.
   * @returns A Promise that resolves to an object containing the next and previous URLs for pagination,
   * as well as an array of detailed Pokemon results.
   * @throws HttpException if there is an error during the retrieval process.
   */
  async getPokemon(
    limit,
    offset,
    type,
    noOfEvolutions,
  ): Promise<IPokemonResponse> {
    try {
      const { next, previous, results } = await this.getPokemonGeneric(
        limit,
        offset,
      );

      const evolutionData = {};

      let detailedResults: Array<IDetailedResult> = await Promise.all(
        results.map(
          async ({ url: pokemonDetailUrl }): Promise<IDetailedResult> => {
            const {
              name,
              id,
              types: typesRaw,
              sprites: {
                other: {
                  'official-artwork': { front_default: imageUrl },
                },
              },
            } = await fetchData(pokemonDetailUrl);
            const types = typesRaw.map(({ type: { name } }) => name);

            if (type && !types.includes(type)) {
              return null;
            }

            const {
              evolution_chain: { url: evolutionChainUrl },
            } = await this.getPokemonSpecies(id);

            if (!evolutionData[evolutionChainUrl]) {
              const { chain } = await fetchData(evolutionChainUrl);

              evolutionData[evolutionChainUrl] =
                this.getEvolutionSequence(chain);
            }

            const evolutionSequence = evolutionData[evolutionChainUrl];

            const numberOfEvolutions = this.getNumberOfEvolutions(
              evolutionSequence,
              name,
            );

            if (
              noOfEvolutions != undefined &&
              noOfEvolutions !== numberOfEvolutions
            ) {
              return null;
            }

            return {
              name,
              id,
              types,
              imageUrl,
              evolutionSequence,
              numberOfEvolutions,
            };
          },
        ),
      );

      detailedResults = detailedResults.filter(Boolean);

      return { next, previous, detailedResults };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error?.message || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private extractSpeciesName(evolutionChain, collector): void {
    const {
      species: { name },
      evolves_to: evolvesTo,
    } = evolutionChain;

    collector.push(name);

    if (isArrayWithNonZeroLength(evolvesTo)) {
      this.extractSpeciesName(evolvesTo[0], collector);
    }
  }

  private getEvolutionSequence(evolutionChain): Array<string> {
    const evolutionSequence = [];

    this.extractSpeciesName(evolutionChain, evolutionSequence);

    return evolutionSequence;
  }

  private getNumberOfEvolutions(evolutionSequence, name): number {
    if (!isArrayWithNonZeroLength(evolutionSequence)) {
      return 0;
    }

    const indexOfName = evolutionSequence.indexOf(name);

    return evolutionSequence.length - 1 - indexOfName;
  }

  private getPokemonGeneric(limit, offset): Promise<IPokemonRawResponse> {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetchData(pokemonUrl);
  }

  private getPokemonSpecies(id): Promise<IPokemonSpeciesRawResponse> {
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

    return fetchData(pokemonSpeciesUrl);
  }
}
