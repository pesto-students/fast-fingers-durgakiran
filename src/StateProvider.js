import React, { createContext, useContext ,useReducer } from "react";

// setup data layer
export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children}) => (
    // eslint-disable-next-line react/react-in-jsx-scope
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext);
