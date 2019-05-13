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
import {getAllTickets} from './databaseHelpers';

const styles = makeStyles({
  App: {
    fontFamily: 'Roboto',
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
  return(
    <AppBar className={stylesheet.appbar} position="sticky" color="default">
      <Toolbar className={stylesheet.toolbar}>
        <h1>Mentor's Assistant - Queue</h1>
      </Toolbar>
    </AppBar>
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
  getAllTickets();
  const [tickets, updateTickets] = useState(debugger_tickets);

  return(  
  <div className={stylesheet.App}>  
    <QueueHeader styles={styles} />
    <center>
      <Queue styles={styles} tickets={tickets} />
    </center>
  </div>
  );
}

export default QueueView;
