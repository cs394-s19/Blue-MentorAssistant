import React, {useState, useEffect} from 'react';
import TicketForm from './TicketForm';
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { firebase } from '../firebaseConfig';

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
  AppWrapper: {
    background: "linear-gradient(to bottom, rgba(240,249,255,1)  0%,rgba(203,235,255,1) 47%,rgba(161,219,255,1) 100%)",
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0px',
    left: '0px',

  },
  
};

const form_classes = {
  titleDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: '10px',
    marginLeft: 'Auto',
    marginRight: 'Auto',

  },

  statusDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',

    marginLeft: 'Auto',
    marginRight: 'Auto',
  },
  titleField: {
    display: 'flex',
    width: '100%',

    // backgroundColor: '#FFFFFF',
  },
  codeField: {
    display: 'flex',
    width: '100%',
  },
  statusField: {
    display: 'flex',

    width: '48%',

  },
  formControl: {
    display: 'flex',
    marginTop: '6px',
    width: '48%',

  }
}

const classesMS = makeStyles(classes);

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          New Ticket
        </Typography>
      </Toolbar>
    </AppBar>
  );
}


const NewTicket = () => {
  const CSS_classes = classesMS();
  
  return (
    <div className={CSS_classes.AppWrapper}>
      <div className = {CSS_classes.App}>
            <Paper className = {CSS_classes.paper} elevation = {6}>
              <Header />
              <TicketForm classes={form_classes} />
            </Paper>
      </div>
    </div>
  );
}

export default NewTicket;
