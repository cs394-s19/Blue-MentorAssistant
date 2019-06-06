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

const MentorResponse = ({classes, ticket}) => (
    <div className={classes.suggestionsDiv}>
      
    </div>
)

export default withStyles(classes)(MentorResponse);