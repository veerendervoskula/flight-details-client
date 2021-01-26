import React, { createContext, useContext, useReducer } from "react";

//for creating react global context
export const StateContext = createContext();

//build a provider for wrapping entire application with the provider to get access to entire app state
export const StateProvider = ({ reducer, initialState, children }) => {
    
    const [state, dispatch] = useReducer(reducer, initialState);

    const deleteFlight = (id) => {
        dispatch({
            type: 'DELETE_FLIGHT',
            payload: id
        });
    };

    const addFlight = (flight) => {
        dispatch({
            type: 'ADD_FLIGHT',
            payload: flight
        });
    }

    const updateFlight = (flight) => {
        dispatch({
            type: 'UPDATE_FLIGHT',
            payload: flight
        });
    }

    const fetchFlightSuccess = (flight) => {
        dispatch({
            type: 'FETCH_FLIGHTS_SUCCESS',
            payload: flight
        });
    }

    const fetchFlightFailure = (error) => {
        dispatch({
            type: 'FETCH_FLIGHTS_FAILURE',
            payload: error
        });
    }

    return <StateContext.Provider
            value={{
            state,
            deleteFlight,
            addFlight,
            updateFlight,
            fetchFlightSuccess,
            fetchFlightFailure
        }}>
        {children}
    </StateContext.Provider>
}

export const useStateValue = () => useContext(StateContext)