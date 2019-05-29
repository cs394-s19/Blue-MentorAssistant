import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Info from './SingleTicketComponents/Info';
import Suggestions from './SingleTicketComponents/Suggestions';
import Footer from './SingleTicketComponents/Footer';
import InternalNotes from './SingleTicketComponents/InternalNotes';
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
  flexBox: {
    display: "flex",
    justifyContent: "center",
  },
};

const dummyTicket = {
  category: "...",
  exercise: "...",
  date: "...",
  message: "...",
  response: ["...",
             "..."],
  student: {id: "0",
            name: "..."},
  textBlocks: [{label: "...",
                   text: "...",
                   type: "..."},
                {label: "...",
                   text: "...",
                   type: "..."}]
};



const classesMS = makeStyles(classes);

const SingleTicket = ({match}) => {
  const [ticket, setTicket] = useState(dummyTicket)
  console.log(match.params.quarter+ '/' + match.params.exercise + '/' + match.params.id);
  const getTicket = () =>
  {
    const database = firebase.database();
    const quarter = match.params.quarter;
    const exercise = match.params.exercise;
    
    const ticketRef = database.ref('/' + quarter + '/' + exercise + '/tickets/' + match.params.id + '/');
     ticketRef.once('value').then((snapshot) => {
      if (snapshot.val())
        setTicket(snapshot.val());
        if (snapshot.val()['status'] === 'Unread')
          database.ref(`${quarter}/${exercise}/tickets/${match.params.id}`).update({ status: 'Opened'});
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
            <Paper className={CSS_classes.paper} elevation={6}>
              <Info quarter={match.params.quarter} id={match.params.id} exercis={match.params.exercise} classes={classes} ticket={ticket} />
              <Suggestions classes={classes} ticket={ticket} />
              <div className={CSS_classes.flexBox} >  
                <Footer classes={classes} ticket={ticket} id={match.params.id} quarter={match.params.quarter} exercise={match.params.exercise} />
                <InternalNotes quarter={match.params.quarter} exercise={match.params.exercise} classes={classes} ticket={ticket}/>
              </div>
            </Paper>
      </div>
    </div>
  );
};

export default SingleTicket;
