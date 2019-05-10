import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Info from './Info';
import Suggestions from './Suggestions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


//css need to be in camel case format
const classes = {
  App: {
    border: '2px solid red',
    overflowY: 'scroll',
    height: '100vh',

  },
  paper: {
    padding: '14px',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: "30px",
    marginBottom: "30px",
  },



};

const SingleTicket = ( {classes} ) => {

  return (
    <div className = {classes.App}>

          <Paper className = {classes.paper} elevation = {6}>
            <Info classes = {classes} />
            <Suggestions classes = {classes} />
          </Paper>

    </div>
  );
};

export default withStyles(classes)(SingleTicket);
