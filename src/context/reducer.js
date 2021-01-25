export const initialState = { flights: [], isFetching : false, hasError : false}

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FLIGHT':
            return {
                ...state,
                flights: state.flights.map(item => {
                    if (item.id === action.payload.id) {
                        item.status = action.payload.status;
                    }
                    return item;
                })
            }
        case 'DELETE_FLIGHT':
            return {
                ...state,
                flights: state.flights.filter(item => item.id !== action.payload)
            }
        case 'ADD_FLIGHT':
            return {
                ...state,
                flights: [...state.flights, action.payload]
            }
        case "FETCH_FLIGHTS_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false
            };
        case "FETCH_FLIGHTS_SUCCESS":
            return {
                ...state,
                isFetching: false,
                flights: action.payload
            };
        case "FETCH_FLIGHTS_FAILURE":
            return {
                ...state,
                hasError: true,
                isFetching: false
            };
        default:
            return state;
    }
}

export default reducer;