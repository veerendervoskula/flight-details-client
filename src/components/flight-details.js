import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { CircularProgress, Divider, Grid, makeStyles, Typography, Box, Paper, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import FlightDetailForm from './flight-form';
import FlightPopup from './flight-popup';
import {formatTimeinHHMM} from '../utils/helpers';
import { getAllFlightDetails, updateFlight } from '../core/api/flight-details';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        height: 75,
        maxWidth: 1500,
    },
    progress: {
        textAlign: 'center',
    },
    arrivalTime: {
        display: 'inline-block',
        fontWeight: '500'
    },
    status: {
        borderRadius: '3px',
        fontSize: 'small',
        padding: '3px 2px 3px',
        marginLeft: '10px',
        marginRight: '10px',
        fontWeight: '500',
        textAlign: 'center'
    },
    destinationPort: {
        fontWeight: '500'
    },
    terminal: {
        fontWeight: '500',
        fontSize: 'small'
    },
    moreDetails: {
        color: 'green',
        cursor: 'pointer',
        fontSize: 'small',
    }
}));
export const FlightDetails = (props) => {
    //this can be done using context api as well
    //const { state, fetchFlightSuccess, fetchFlightFailure } = useStateValue();
    const classes = useStyles();
    const [isFetching, setIsFetching] = useState(false);
    const [hasError, setError] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(false);
    const [flightDetails, setFlightDetails] = useState([]);
    const [flightUpdateSync, setFlightUpdateSync] = useState(false);
    console.log('am in flight status');

    const fetchFlights = async () => {
        try {
            setIsFetching(true);
            const response = await getAllFlightDetails();
            setFlightDetails(response.data);
        } catch (error) {
            setError(error.message)
            console.error(error);
        } finally {
            setIsFetching(false);
        }
    };

    const updateFlightDetails = async (flightData) => {
        try {
            await updateFlight(flightData);
            setFlightUpdateSync(!flightUpdateSync);
        } catch (error) {
            setError(error.message)
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFlights();
    }, [flightUpdateSync]);

    const handleOpenPopup = (value) => () => {
        setSelectedFlight(value);
        setOpenPopup(true);
    };

    const handleSave = (updatedFlightDetails, resetForm) => {
        setOpenPopup(false);
        updateFlightDetails(updatedFlightDetails);
        resetForm();
    }

    return (
        // <div className={classes.root}>
        <Container maxWidth="sm">
            {
                isFetching ? (<CircularProgress className={classes.progress} />) :
                    hasError ? (
                        <Typography component="div">
                            <Box textAlign="center" m={1}>
                                Error Occurred while fetching flight details. Please give a try after sometime
                        </Box>
                        </Typography>
                    ) :
                        (flightDetails.length > 0 ? flightDetails.map(item =>
                            <Grid container spacing={3} justify="space-between" key={item._id}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper} elevation={3}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={2}>
                                                <Typography className={classes.arrivalTime} style={{
                                                    textDecoration: item.status === 'DELAYED' && 'line-through',
                                                    fontSize: item.status === 'DELAYED' ? 'smaller' : 'normal',
                                                    fontWeight: item.status === 'DELAYED' ? '300' : '500',
                                                }}>{formatTimeinHHMM(item.scheduledArrivalTime)}</Typography>
                                                {item.status === 'DELAYED' && <Typography className={classes.arrivalTime}>&nbsp;{formatTimeinHHMM(item.actualArrivalTime)}</Typography>}
                                            </Grid>
                                            <Divider orientation="vertical" flexItem />
                                            <Grid item xs={2} container>
                                                <Grid item xs container direction="column" spacing={2}>
                                                    <Grid item>
                                                        <Typography gutterBottom variant="subtitle1" className={classes.destinationPort}>
                                                            {item.destinationPortName}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="body2">
                                                            {item.flightCode} {item.flightProvider}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Divider orientation="vertical" flexItem />
                                            <Grid item xs={2}>
                                                <Typography gutterBottom variant="subtitle1"
                                                    className={classes.status}
                                                    style={{
                                                        backgroundColor: item.status === 'DELAYED' ? '#FEC72F' : 'green',
                                                        color: item.status === 'DELAYED' ? 'black' : 'white'
                                                    }}>
                                                    {item.status}
                                                </Typography>
                                            </Grid>
                                            <Divider orientation="vertical" flexItem />
                                            <Grid item xs={3}>
                                                <Typography gutterBottom variant="subtitle1" className={classes.terminal}>
                                                    {item.terminal}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom variant="subtitle1" className={classes.moreDetails} onClick={handleOpenPopup(item)}>
                                                    {"More details"}
                                                    <ArrowRightAltIcon fontSize="inherit" />
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        ) : <Typography component="div">
                                <Box textAlign="center" m={1}>
                                    No available flights to show
                       </Box>
                            </Typography>
                        )
            }
            <FlightPopup
                title="Flight Update"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <FlightDetailForm flight={selectedFlight} handleSave={handleSave} />
            </FlightPopup>
        {/* </div> */}
        </Container>
    )
}