import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
  mentorNotesField: {
    position: 'relative',
    marginTop: '10px',
    width: '100%',

  },
};

const Suggestions = ({classes, ticket}) => {


  const [sug0, setSug0] = useState("...")
  const [sug1, setSug1] = useState("...")
  const [mentorNotes, setMentorNotes] = useState([ReactHtmlParser("This problem usually happens when student misspell fcn names<br />-M"), ReactHtmlParser("ask students to go through the lecture 2 slides if they ask you about variables<br />-J")]);
  // TODO: Map the suggestions properly instead of naïvely assuming that there will be only two

  const getSuggestions = () =>
  {
    setSug0(ReactHtmlParser(ticket['response']['0']));
    setSug1(ReactHtmlParser(ticket['response']['1']));
  }

  const getMentorNotes = () => 
  {
    //setMentorNotes([ReactHtmlParser(ticket['notes']['0']), ReactHtmlParser(ticket['notes']['1'])]);
  }

  useEffect(() =>
  {
    getSuggestions();
    getMentorNotes();
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
                <Paper className={classes.suggestionPaper} elevation = {2}>
                  <ListItem>
                    <ListItemText
                      primary={sug0}
                      />
                    </ListItem>
                </Paper>
                <Paper className={classes.suggestionPaper} elevation = {2}>
                    <ListItem>
                      <ListItemText
                        primary={sug1}
                      />
                      </ListItem>
                </Paper>
        </List>
      </div>
      <br /> <br />
      <div className={classes.typographyDiv}>
        <Typography variant="h5" className={classes.typography}>
          Mentor Notes
        </Typography>
      </div>
      <div className={classes.allSuggestions}>
        <List>
                <Paper className={classes.suggestionPaper} elevation = {2}>
                  <ListItem>
                    <ListItemText
                      primary={mentorNotes[0]}
                      />
                    </ListItem>
                </Paper>
                <Paper className={classes.suggestionPaper} elevation = {2}>
                    <ListItem>
                      <ListItemText
                        primary={mentorNotes[1]}
                      />
                      </ListItem>
                </Paper>
        </List>
      </div>


    </div>
  )
};

export default withStyles(classes)(Suggestions);
