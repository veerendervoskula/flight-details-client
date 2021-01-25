import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
}));

const PageHeader = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography component="div">
                <Box textAlign="center" m={1}>
                    Explore available flight routes to know the whereabouts of arrival flights
                </Box>
            </Typography>
        </div>
    )

}

export default PageHeader;