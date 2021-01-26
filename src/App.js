import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PageHeader from './components/page-header';
import { FlightDetails } from './components/flight-details';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <header>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Flight Details
            </Typography>
          </Toolbar>
        </header>
      </AppBar>
      <PageHeader />
      <FlightDetails />
    </div>
  );
}

export default App;