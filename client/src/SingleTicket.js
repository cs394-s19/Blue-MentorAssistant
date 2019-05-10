import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Info from './Info';
import Suggestions from './Suggestions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';


//css need to be in camel case format
const classes = {
  App: {
    border: '2px solid red',
    overflowY: 'scroll',
    height: '100vh',

  },
  paper: {
    width: '90%',
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
          <AppBar position="static">
               <Toolbar>
                 <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                   <MenuIcon />
                 </IconButton>
                 <Typography variant="h6" color="inherit" className={classes.grow}>
                    Ticket 103201
                 </Typography>
                 <Button color="inherit">Save</Button>
               </Toolbar>
             </AppBar>
            <Info classes = {classes} />
            <Suggestions classes = {classes} />
          </Paper>

    </div>
  );
};

export default withStyles(classes)(SingleTicket);
