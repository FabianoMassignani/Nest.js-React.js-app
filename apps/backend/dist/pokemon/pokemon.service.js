"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonService = void 0;
const common_1 = require("@nestjs/common");
const pokemon_utils_1 = require("./pokemon.utils");
let PokemonService = class PokemonService {
    extractSpeciesName(evolutionChain, collector) {
        const { species: { name }, evolves_to: evolvesTo, } = evolutionChain;
        collector.push(name);
        if ((0, pokemon_utils_1.isArrayWithNonZeroLength)(evolvesTo)) {
            this.extractSpeciesName(evolvesTo[0], collector);
        }
    }
    getEvolutionSequence(evolutionChain) {
        const evolutionSequence = [];
        this.extractSpeciesName(evolutionChain, evolutionSequence);
        return evolutionSequence;
    }
    getNumberOfEvolutions(evolutionSequence, name) {
        if (!(0, pokemon_utils_1.isArrayWithNonZeroLength)(evolutionSequence)) {
            return 0;
        }
        const indexOfName = evolutionSequence.indexOf(name);
        return evolutionSequence.length - 1 - indexOfName;
    }
    getPokemonGeneric(limit, offset) {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        return (0, pokemon_utils_1.fetchData)(pokemonUrl);
    }
    getPokemonSpecies(id) {
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
        return (0, pokemon_utils_1.fetchData)(pokemonSpeciesUrl);
    }
    async getPokemon(limit, offset, type, noOfEvolutions) {
        try {
            const { next, previous, results } = await this.getPokemonGeneric(limit, offset);
            const evolutionData = {};
            let detailedResults = await Promise.all(results.map(async ({ url: pokemonDetailUrl }) => {
                const { name, id, types: typesRaw, sprites: { other: { 'official-artwork': { front_default: imageUrl }, }, }, } = await (0, pokemon_utils_1.fetchData)(pokemonDetailUrl);
                const types = typesRaw.map(({ type: { name } }) => name);
                if (type && !types.includes(type)) {
                    return null;
                }
                const { evolution_chain: { url: evolutionChainUrl }, } = await this.getPokemonSpecies(id);
                if (!evolutionData[evolutionChainUrl]) {
                    const { chain } = await (0, pokemon_utils_1.fetchData)(evolutionChainUrl);
                    evolutionData[evolutionChainUrl] =
                        this.getEvolutionSequence(chain);
                }
                const evolutionSequence = evolutionData[evolutionChainUrl];
                const numberOfEvolutions = this.getNumberOfEvolutions(evolutionSequence, name);
                if (noOfEvolutions != undefined &&
                    noOfEvolutions !== numberOfEvolutions) {
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
            }));
            detailedResults = detailedResults.filter(Boolean);
            return { next, previous, detailedResults };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: error?.message || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PokemonService = PokemonService;
exports.PokemonService = PokemonService = __decorate([
    (0, common_1.Injectable)()
], PokemonService);
//# sourceMappingURL=pokemon.service.js.map