import {
    GET_POKEMON_REQUEST,
    GET_POKEMON,
    GET_P0KEMON_FAIL,
} from "../constants/pokemon";

export const pokemonReducer = (
    state = { data: [], loadingA: false },
    action
) => {
    switch (action.type) {
        case GET_POKEMON_REQUEST:
            return { ...state, loadingA: true, };
        case GET_POKEMON:
            return {
                ...state,
                loadingA: false,
                data: action.payload.avaliacao,
            };
        case GET_P0KEMON_FAIL:
            return {
                ...state,
                loadingA: false,
            };
        default:
            return { ...state }
    }
};
