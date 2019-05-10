import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Info from './Info';
import Suggestions from './Suggestions';


//css need to be in camel case format
const classes = {
  App: {
    border: '2px solid red',

  },
  paper: {
    overflowY: 'scroll',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
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
