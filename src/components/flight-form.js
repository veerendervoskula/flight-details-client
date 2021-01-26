/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormHelperText, Grid, Input, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, TimePicker } from "@material-ui/pickers";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from "@date-io/date-fns";
import { Form, useForm } from '../hooks/useForm';
import { getFlightStatus } from '../core/api/flight-details';
import { convertToDefEventPara, getHoursMinutesFromDate, setHoursToDate } from '../utils/helpers';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5)
  },
  button: {
    margin: theme.spacing(0.5)
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    '& .MuiButton-label': {
      color: theme.palette.secondary.main,
    }
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    '& .MuiButton-label': {
      color: theme.palette.primary.main,
    }
  },
}));

export default function FlightDetailForm(props) {
  const classes = useStyles();
  const { flight, handleSave } = props;
  const initialFValues = {
    status: flight.status,
    scheduledArrivalTime: setHoursToDate(flight.arrivalDate, flight.scheduledArrivalTime),
    actualArrivalTime: setHoursToDate(flight.arrivalDate, flight.actualArrivalTime),
    departureTime: setHoursToDate(flight.departureDate, flight.departureTime),
  }

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('status' in fieldValues)
      temp.status = fieldValues.status ? "" : "This field is required."
    if ('actualArrivalTime' in fieldValues)
      temp.actualArrivalTime = fieldValues.actualArrivalTime ? "" : "This field is required."
    if ('departureTime' in fieldValues)
      temp.departureTime = fieldValues.departureTime ? "" : "This field is required."
    if ('scheduledArrivalTime' in fieldValues)
      temp.scheduledArrivalTime = fieldValues.scheduledArrivalTime ? "" : "This field is required."
    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  const handleSubmit = e => {
    e.preventDefault()
    handleSave({
      ...values,
      scheduledArrivalTime: getHoursMinutesFromDate(values.scheduledArrivalTime),
      actualArrivalTime: getHoursMinutesFromDate(values.actualArrivalTime),
      departureTime: getHoursMinutesFromDate(values.departureTime),
    }, resetForm);
  }

  useEffect(() => {
    if (flight != null) {
      setValues({
        ...flight,
        scheduledArrivalTime: setHoursToDate(flight.arrivalDate, flight.scheduledArrivalTime),
        actualArrivalTime: setHoursToDate(flight.arrivalDate, flight.actualArrivalTime),
        departureTime: setHoursToDate(flight.departureDate, flight.departureTime),
      });

    }
  }, [flight]);

  const form = (
    <div>
      <Form onSubmit={handleSubmit}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Flight number
            </Typography>
            <Typography variant="body2" gutterBottom>
              {flight.flightCode}
            </Typography>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Arrival Station
            </Typography>
            <Typography variant="body2" gutterBottom>
              {flight.destinationPortName}
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                autoOk
                ampm={false}
                disabled
                name="scheduledArrivalTime"
                label="Scheduled Arrival Time"
                value={values.scheduledArrivalTime}
                onChange={date => handleInputChange(convertToDefEventPara("scheduledArrivalTime", date))}
                keyboardbuttonprops={{
                  'aria-label': 'change time',
                }}
                inputVariant="standard"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="primary" gutterBottom >
              Flight Route
            </Typography>
            <Typography variant="body2">
              {flight.sourcePortName} - {flight.destinationPortName}
            </Typography>
            <FormControl required className={classes.formControl}>
              <InputLabel id="dialog-select-label">Status</InputLabel>
              <Select
                labelId="dialog-select-label"
                id="dialog-select"
                name="status"
                label="status"
                value={values.status}
                onChange={handleInputChange}
                input={<Input />}
              >
                {getFlightStatus().map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
            </FormControl>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                required
                clearable
                ampm={false}
                disabled={values.status === 'ON SCHEDULE' || values.status === 'LANDED'}
                name="actualArrivalTime"
                label="Actual Arrival Time"
                value={values.actualArrivalTime}
                keyboardbuttonprops={{
                  'aria-label': 'change time',
                }}
                onChange={date => handleInputChange(convertToDefEventPara("actualArrivalTime", date))}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <div className={`${classes.buttonGroup}`}>
            <Button
              color="primary" autoFocus type="submit" variant="contained"
              className={`${classes.button} primary`} size="large">Submit
             </Button>
            <Button
              className={`${classes.button} secondary`}
              text="Reset" size="large"
              color="default" variant="contained"
              onClick={resetForm}>Reset
              </Button>
          </div>
        </Grid>
      </Form>
    </div>
  );

  return (
    <div className={classes.root}>
      {form}
    </div>
  );
}

