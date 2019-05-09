import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const classes = {
  root: {
    backgroundColor: "white",
  },

};
const Suggestions = ({classes}) => {

  return (
    <div className={classes.suggestionsDiv}>
      <List>
              
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Single-line item"
                    />
                    </ListItem>

      </List>
    </div>
  )
};

export default withStyles(classes)(Suggestions);
