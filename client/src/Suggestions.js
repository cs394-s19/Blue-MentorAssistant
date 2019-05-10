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
    border: '2px solid red',
  },
};
const Suggestions = ({classes}) => {

  return (

    <div className={classes.suggestionsDiv}>
      <Typography variant="h5" className={classes.typography}>
        Suggestions
      </Typography>
      <div className={classes.allSuggestions}>
        <List>
                <Paper className={classes.suggestionPaper} elevation = {10}>
                  <ListItem>
                    <ListItemText
                      primary="Single-line item"
                    />
                    </ListItem>
                </Paper>
                <Paper className={classes.suggestionPaper} elevation = {10}>
                    <ListItem>
                      <ListItemText
                        primary="Single-line item"
                      />
                      </ListItem>
                </Paper>
        </List>
      </div>
    </div>
  )
};

export default withStyles(classes)(Suggestions);
