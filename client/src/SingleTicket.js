import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Info from './Info';
import Suggestions from './Suggestions';
import {getTicket} from './databaseHelpers';

import { firebase } from './firebaseConfig';

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
    // background: 'linear-gradient(58deg,#1df4ef,#0be89b)',
    // background: '#EEE',

    background: "linear-gradient(to bottom, rgba(240,249,255,1)  0%,rgba(203,235,255,1) 47%,rgba(161,219,255,1) 100%)",
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0px',
    left: '0px',

  },
  textField: {
    border: '1px solid red',
    width: '500px',
    marginLeft: '400px',
  },
};

const dummyTicket = {
  category: "...",
  date: "...",
  message: "...",
  response: {0: "...",
             1: "..."},
  student: {id: "0",
            name: "..."},
  textBlocks: {0: {label: "...",
                   text: "...",
                   type: "..."},
               1: {label: "...",
                   text: "...",
                   type: "..."}}
};



const classesMS = makeStyles(classes);

const SingleTicket = ({match}) => {
  const [ticket, setTicket] = useState(dummyTicket)
  const getTicket = () =>
  {
    const database = firebase.database();
    const ticketRef = database.ref(match.params.id);
     ticketRef.once('value').then((snapshot) => {
      setTicket(snapshot.val());
    });
  }

  useEffect(() =>
  {
    getTicket();
  }, []);

  const CSS_classes = classesMS();
  return (
    <div className={CSS_classes.AppWrapper}>
      <div className = {CSS_classes.App}>
            <Paper className = {CSS_classes.paper} elevation = {6}>
              <Info classes = {classes} ticket = {ticket} />
              <Suggestions classes = {classes} ticket = {ticket} />
            </Paper>
      </div>
    </div>
  );
};

export default SingleTicket;
