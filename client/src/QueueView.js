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
import {getAllTickets} from './databaseHelpers';

const styles = makeStyles({
  wrapper: {
    background: "linear-gradient(to bottom, rgba(240,249,255,1)  0%,rgba(203,235,255,1) 47%,rgba(161,219,255,1) 100%)",
  },
  app: {
    fontFamily: 'Roboto',
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
    gridTemplateColumns: '300px 250px 230px 50px',
  }
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
    <ListItemText><div className={stylesheet.ticketinfo}><b>{ticket}</b> <p>John Doe</p> <p>02/21/19</p><HelpOutline></HelpOutline></div></ListItemText>
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
  const debugger_tickets = ["Hey!! Help me with HW4 pls", "WIll midterm results by tomorrow even though I took it today", "what is const mean?","Hey!! Help me with HW4 pls", "WIll midterm results by tomorrow even though I took it today", "what is const mean?","Hey!! Help me with HW4 pls", "WIll midterm results by tomorrow even though I took it today", "what is const mean?","Hey!! Help me with HW4 pls", "WIll midterm results by tomorrow even though I took it today", "what is const mean?"];
  //getAllTickets();
  const [tickets, updateTickets] = useState(debugger_tickets);

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
