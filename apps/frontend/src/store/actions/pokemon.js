import {
    GET_POKEMON_REQUEST,
    GET_POKEMON,
    GET_P0KEMON_FAIL,
} from "../constants/pokemon";

import axios from "axios";
import { API_URL } from "../../config";

export const getPokemon = (data) => async (dispatch) => {
    dispatch({ type: GET_POKEMON_REQUEST });

    await axios.get(`${API_URL}/pokemon`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
        .then(response => {

            console.log(response);
            dispatch({
                type: GET_POKEMON,
                payload: {
                    pacotes: response.data,
                },
            });
        })
        .catch(error => {
            dispatch({
                type: GET_P0KEMON_FAIL,
                payload: {
                    error: error.response.data,
                },
            });
        });
}
