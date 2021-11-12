import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const useStyles = makeStyles((theme) => ({
    text: {
        color: 'black',
        padding: '10%'
    },
    boxStyle: {
        width: '100hh',
        height: '100vh',
        textAlign: 'center',
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
    }
}));

export default function WelcomeBanner() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Box sx={{bgcolor: 'white'}} className={classes.boxStyle}>
                <Typography variant="h1" component="div" className={classes.text}>Welcome to the Calendar App!</Typography>
            </Box>
        </React.Fragment>
    );
}
