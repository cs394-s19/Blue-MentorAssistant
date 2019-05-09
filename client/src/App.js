import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withStyles, } from '@material-ui/core';
import SingleTicket from './SingleTicket';
// import { makeStyles } from '@material-ui/styles';

const styles = {
  App: {
    // background: 'linear-gradient(58deg,#1df4ef,#0be89b)',
    background: '#EEE',
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
        <SingleTicket styles = {classes}/>
    </div>
  );
}

export default withStyles(styles)(App);
