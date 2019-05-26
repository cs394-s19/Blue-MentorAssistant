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
          <h3>Mentor's Assistant | Queue | Winter 2019</h3>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const Queue = ({tickets, styles}) => {
  const stylesheet = styles();
  const removeTrailingZero = (x) => {
    if((!isNaN(Number(x)))&&(x.substring(0,1) === '0')) {
      return x.substring(1);
    }
    return x;
  }
  const getDateString = (date) => {
    if(isNaN(Number(date))){
      console.log("queue view error: incorrect date string");
      return "";
    }
    const iso = new Date(Number(date)).toISOString();
    const year = iso.substring(0,4);
    const month = removeTrailingZero(iso.substring(8,10));
    const day = removeTrailingZero(iso.substring(5,7));
    return day + "/" + month + "/" + year;
  }
  const QueueListItems = tickets.map(ticket => {
    // if (ticket['status'] !== 'Completed')
      return(
        <ListItem button>
        <ListItemText><a className={stylesheet.links} href={'/ticket/'+ticket["quarter"]+"/"+ticket["exercise"]+"/"+ticket["ticket"]+"/"}><div className={stylesheet.ticketinfo}><b>{ticket["exercise"]} <br /> {ticket["message"]}</b> <p>{ticket["student_name"]}</p> <p>{getDateString(ticket["date"])}</p><p>{ticket["status"]}</p></div></a></ListItemText>
        </ListItem>
        );
    }
  );
  //console.log(QueueListItems);
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
        "date": "",
        "exercise": "",
        "message": "",
        "student_id": "",
        "student_name": "",
        "category": "null",
        "quarter": "winter2019",
      },
  ];
  const [tickets, updateTickets] = useState(debugger_tickets);

  useEffect(() => {
    const getData = () => {
      const database = firebase.database();

      //TODO: Make this dynamic
      const current_quarter = 'winter2019';

      const dbref = database.ref('/'+current_quarter+'/');
      dbref.on('value', (snapshot) => {
        const db = snapshot.val();
        console.log(db);
        //get numeric keys only, this will change once the database is reorganized
        const exercises = Object.keys(db);
        console.log(exercises);
        const blank_ticket =     {
          "ticket": "0",
          "date": "",
          "exercise": "",
          "message": "",
          "student_id": "",
          "student_name": "",
          "category": "null",
          "quarter": "winter2019",
          "status": ""
        };

        const new_tickets = exercises.map(exercise => 
        {
          const tickets_from_exercises = Object.keys(db[exercise]["tickets"]).map(k => {
            console.log(k);
            const tx = JSON.parse(JSON.stringify(blank_ticket));
            tx["ticket"] = k;
            tx["date"] = db[exercise]["tickets"][k]["date"];
            tx["exercise"] = exercise;
            tx["message"] = db[exercise]["tickets"][k]["message"];
            tx["student_name"] = db[exercise]["tickets"][k]["student"]["name"];
            tx["student_id"] = db[exercise]["tickets"][k]["student"]["id"];
            tx["category"] = db[exercise]["tickets"][k]["category"];
            tx["status"] = db[exercise]["tickets"][k]["status"];
            tx["quarter"] = current_quarter;
            return tx;
          });
          return tickets_from_exercises;
        });
        const new_tickets_flat = new_tickets.flat();
        console.log(new_tickets_flat);
        updateTickets(new_tickets_flat);
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
