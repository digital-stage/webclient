import React from "react";
import {compose, createStore} from "redux";
import {MakeStore, createWrapper, Context} from 'next-redux-wrapper';
import {NormalizedState} from "../schema";
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';
import rootReducer from "./reducers";

const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const useDispatch = useReduxDispatch;

export const useSelector = useReduxSelector;

const makeStore: MakeStore<NormalizedState> = (context: Context) =>
    createStore(
        rootReducer,
        composeEnhancers()
    );

export const wrapper = createWrapper<NormalizedState>(makeStore, {debug: true});