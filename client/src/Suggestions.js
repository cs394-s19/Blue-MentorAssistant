import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const classes = {
  root: {
    backgroundColor: "white",
  },

  typography: {

  },
  suggestionsDiv: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
  },
  suggestionPaper: {
    marginTop: '5px',
  },
  allSuggestions: {

  },
  typographyDiv: {
    border: '1px solid red',
    width: '100%',
  },
};
const Suggestions = ({classes}) => {

  return (

    <div className={classes.suggestionsDiv}>
      <div className={classes.typographyDiv}>
        <Typography variant="h5" className={classes.typography}>
          Suggestions
        </Typography>
      </div>
      <div className={classes.allSuggestions}>
        <List>
                <Paper className={classes.suggestionPaper} elevation = {2}>
                  <ListItem>
                    <ListItemText
                      primary="Take a look at the chapter 2 of Common Error."
                      />
                    </ListItem>
                </Paper>
                <Paper className={classes.suggestionPaper} elevation = {2}>
                    <ListItem>
                      <ListItemText
                        primary='Try to search with keywords "racket syntax for overlay/xy".'
                      />
                      </ListItem>
                </Paper>
                <Paper className={classes.suggestionPaper} elevation = {2}>
                    <ListItem>
                      <ListItemText
                        primary="Take a look at Racket Syntax Documentation."
                      />
                      </ListItem>
                </Paper>
        </List>
      </div>
    </div>
  )
};

export default withStyles(classes)(Suggestions);
