import axios from '../axios';

export const getFlightStatus = () => ([
    {
        value: 'DELAYED',
        label: 'Delayed',
    },
    {
        value: 'ON SCHEDULE',
        label: 'On Schedule',
    },
    {
        value: 'LANDED',
        label: 'Landed',
    }
]);

export const ENDPOINTS = {
    FLIGHT_DETAILS: './flight-details.json',
}

export function updateFlight(flightData) {
    return axios.patch(`${ENDPOINTS.FLIGHT_DETAILS}/${flightData._id}`, flightData);
}

export function getAllFlightDetails() {
    return axios.get(ENDPOINTS.FLIGHT_DETAILS);
}
