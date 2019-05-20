//QueueView
//Home for TAs

import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HelpOutline from '@material-ui/icons/HelpOutline';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { firebase } from './firebaseConfig';

const styles = makeStyles({
  wrapper: {
    background: "linear-gradient(to bottom, rgba(240,249,255,1)  0%,rgba(203,235,255,1) 47%,rgba(161,219,255,1) 100%)",
    height: '1000px',
    width: '100%',
  },
  app: {
    fontFamily: 'Roboto',
    height: '100%',
  },
  appbarwrapper: {
    width: '60%',
  },
  appbar: {

  },
  toolbar: {

  },
  list: {
    width: '60%',
  },
  ticketinfo: {
    display: 'grid',
    gridTemplateColumns: '450px 170px 150px 50px',
  },
  links: {
    color: 'black',
    textDecoration: 'none',
  },
});

const QueueHeader = ({styles}) => {
  const stylesheet = styles();
  const handleBackBtn = () => {
    window.history.back();
  }
  return(
    <div className={stylesheet.appbarwrapper}>
      <AppBar className={stylesheet.appbar} position="sticky" color="primary">
        <Toolbar className={stylesheet.toolbar}>
          <IconButton onClick={handleBackBtn} className={stylesheet.backButton} color="inherit" aria-label="back">
            <ArrowBack />
          </IconButton>
          <h3>Mentor's Assistant | Queue</h3>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const Queue = ({tickets, styles}) => {
  const stylesheet = styles();
  const QueueListItems = tickets.map(ticket => 
  <ListItem button>
    <ListItemText><a className={stylesheet.links} href={'/ticket/'+ticket["ticket"]}><div className={stylesheet.ticketinfo}><b>{ticket["exercise"]} <br /> {ticket["message"]}</b> <p>{ticket["student"]["name"]}</p> <p>{ticket["date"]}</p><HelpOutline></HelpOutline></div></a></ListItemText>
  </ListItem>
  );
  console.log(QueueListItems);
  return(
    <List className={stylesheet.list}>
      <ListItem button disabled>
        <ListItemText><div className={stylesheet.ticketinfo}><p>Ticket</p><p>Name</p><p>Date</p><p>Status</p></div></ListItemText>
      </ListItem>
      {QueueListItems}
    </List>
  );
}

const QueueView = () => {
  const stylesheet = styles();
  //debugging
  const debugger_tickets = [
    {
      "ticket": "0",
      "date": "2017-05-24",
      "exercise": "HW1: Fingers",
      "message": "I’m getting an error...",
      "student": {
        "id": "bbb0000",
        "name": "Joseph Doe",
      },
      "category": "null",
    },
  ];
  const [tickets, updateTickets] = useState([]);

  useEffect(() => {
    const getData = () => {
      const database = firebase.database();
      const dbref = database.ref('/');
      dbref.on('value', (snapshot) => {
        const db = snapshot.val();
        //console.log(db);
        //get numeric keys only, this will change once the database is reorganized
        const keys = Object.keys(db).filter(k => !isNaN(Number(k)));
        //console.log(keys);
        const blank_ticket =     {
          "ticket": "0",
          "date": "",
          "exercise": "",
          "message": "",
          "student": {
            "id": "",
            "name": "",
          },
          "category": "null",
        };
        const new_tickets = keys.map(k => {
          const tx = JSON.parse(JSON.stringify(blank_ticket));
          tx["ticket"] = k;
          tx["date"] = db[k]["date"];
          tx["exercise"] = db[k]["exercise"];
          tx["message"] = db[k]["message"];
          tx["student"] = db[k]["student"];
          tx["category"] = db[k]["category"];
          return tx;
        });
        //console.log(new_tickets);
        updateTickets(new_tickets);
      });
    }
    getData();
  }, []);

  return(  
  <div className={stylesheet.wrapper}>
    <div className={stylesheet.app}>  
      <center>
        <QueueHeader styles={styles} />
        <Queue styles={styles} tickets={tickets} />
      </center>
    </div>
  </div>
  );
}

export default QueueView;
