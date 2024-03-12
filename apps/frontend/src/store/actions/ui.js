import {
    SET_UI
} from "../constants/ui";

export const setNavigate = (data) => async (dispatch) => {
    dispatch({
        type: SET_UI,
        payload: data
    });
}