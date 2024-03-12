import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { pokemonReducer } from "./reducers/pokemon";


const persistConfig = {
    key: 'root',
    storage,
};

export const rootReducer = combineReducers({
    pokemonReducer: pokemonReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let initialState = {};

const middleware = [thunk];

export const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);