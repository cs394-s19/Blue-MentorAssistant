import React, {useState} from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Info from './Info';
import Suggestions from './Suggestions';
import {getTicket} from './databaseHelpers';



//css need to be in camel case format
const classes = {
  App: {
    overflowY: 'scroll',
    height: '100vh',

  },
  paper: {
    width: '74%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: "30px",
    marginBottom: "30px",
  },
  root: {
     flexGrow: 1,
   },
   grow: {
     flexGrow: 1,
   },
  menuButton: {
  marginLeft: -12,
  marginRight: 20,
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
