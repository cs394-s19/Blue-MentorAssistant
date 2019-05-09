import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Info from './Info';
import Suggestions from './Suggestions';


//css need to be in camel case format
const classes = {
  paper: {

    width: '90%',
    leftMargin: 'auto',
    rightMargin: 'auto',
    textAlign: 'center',

  },

};

const SingleTicket = ( {classes} ) => {

  return (
    <div>
        <Paper className = {classes.paper}>
          <Info classes = {classes} />
          <Suggestions classes = {classes} />
        </Paper>
    </div>
  );
};

export default withStyles(classes)(SingleTicket);
