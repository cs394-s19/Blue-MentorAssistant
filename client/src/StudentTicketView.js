import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Info from './SingleTicketComponents/Info';
import Suggestions from './SingleTicketComponents/Suggestions';
import Footer from './SingleTicketComponents/Footer';
import {getTicket} from './databaseHelpers';
import StudentViewInfo from './StudentTicketViewComponents/StudentViewInfo';
import ChatPane from './ChatComponents/ChatPane';
import { firebase } from './firebaseConfig';
import UserTypes from './enums/UserTypes';

const classes = {
  App: {
    overflowY: 'scroll',
    height: '100vh',


  },
  titleDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: '10px',
    marginLeft: 'Auto',
    marginRight: 'Auto',
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
  textBlocks: [{label: "...",
                   text: "...",
                   type: "..."},
               {label: "...",
                   text: "...",
                   type: "..."}]
};



const classesMS = makeStyles(classes);

const StudentTicketView = ({match}) => {
  const [ticket, setTicket] = useState(dummyTicket)
  console.log('/' + match.params.quarter + '/' + match.params.exercise + '/tickets/' + match.params.id + '/');
  const getTicket = () =>
  {
    const database = firebase.database();

    const quarter = match.params.quarter;
    const exercise = match.params.exercise;

    const ticketRef = database.ref('/' + quarter + '/' + exercise + '/tickets/' + match.params.id + '/');
     ticketRef.once('value').then((snapshot) => {
      console.log(snapshot.val());
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
              <StudentViewInfo classes = {classes} exercis={match.params.exercise} ticket = {ticket} />
              <ChatPane ticket={ticket} match={match} exercise={match.params.exercise} quarter={match.params.quarter} userType={UserTypes.STUDENT} />
            </Paper>
      </div>
    </div>
  );
};

export default StudentTicketView;
