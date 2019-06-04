import React from 'react';
import './App.css';
import { withStyles, } from '@material-ui/core';
import SingleTicket from './SingleTicket';
// import { firebase } from './firebaseConfig';
// import { makeStyles } from '@material-ui/styles';

const styles = {
  App: {
    // background: 'linear-gradient(58deg,#1df4ef,#0be89b)',
    // background: '#EEE',

    background: "linear-gradient(to bottom, rgba(240,249,255,1)  0%,rgba(203,235,255,1) 47%,rgba(161,219,255,1) 100%)",
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0px',
    left: '0px',

  },
  textField: {
    border: '1px solid red',
    width: '500px',
    marginLeft: '400px',
  },
};

const App = ({classes}) => {
  // const classes = useStyles();

  return (
    <div className={classes.App}>
        <Home />
    </div>
  );
}

export default withStyles(styles)(App);
