import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ReactHtmlParser from 'react-html-parser';

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
    width: '100%',
  },
  emailForm: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    height: '200px',

  },
};

const Suggestions = ({classes, ticket}) => {

  const [suggestions, setSuggestions] = useState([]);


  const getSuggestions = (ticket) =>
  {
    setSuggestions(ticket["response"]);

  }
  useEffect(() =>
  {
    getSuggestions(ticket);
  },[ticket]);

  return (

    <div className={classes.suggestionsDiv}>

      <div className={classes.typographyDiv}>
        <Typography variant="h5" className={classes.typography}>
          Suggestions
        </Typography>
      </div>
      <div className={classes.allSuggestions}>
        <List>

          {
            suggestions ?
            suggestions.map((sug) => {
              return(
                <Paper className={classes.suggestionPaper} elevation = {2}>
                  <ListItem>
                    <ListItemText
                      primary={sug}
                      />
                    </ListItem>
                </Paper>
              );
            })
            :
            <div></div>
          }
        </List>
      </div>

      


    </div>
  )
};

export default withStyles(classes)(Suggestions);
