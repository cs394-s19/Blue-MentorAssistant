//QueueView
//Home for TAs

import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { firebase } from './firebaseConfig';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


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
    width: '70%',
  },
  appbar: {

  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  list: {
    width: '100%',
  },
  listPaper: {
    width: '70%',
    overflowX: 'hidden',
  },
  ticketinfo: {
    display: 'grid',
    gridTemplateColumns: '450px 170px 150px 150px 150px 100px',
  },
  links: {
    color: 'black',
    textDecoration: 'none',
  },
  appBarTitle: {

  },
  NewTicketBtn: {

  },
});

const QueueHeader = ({styles}) => {
  const stylesheet = styles();
  const handleNewTicketBtn = () => {
    window.location.href = "/newticket/";
  }
  return(
    <div className={stylesheet.appbarwrapper}>
      <AppBar className={stylesheet.appbar} position="sticky" color="primary">
        <Toolbar className={stylesheet.toolbar}>
          <h3 className={stylesheet.appBarTitle}>Mentor's Assistant | Queue | Winter 2019</h3>
          <Button className={stylesheet.NewTicketBtn} variant="contained" color="primary" onClick={handleNewTicketBtn}>New Ticket</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const Queue = ({tickets, styles}) => {
  const stylesheet = styles();
  const [sort, setSort] = useState([1, 0]);
  const [ticketsState, setTickets] = useState([]);
  const [showCompleted, toggleCompleted] = useState(false);

  useEffect(() => {
    setTickets(tickets);
    console.log(ticketsState);
  }, [tickets]);

  const sortDateRecent = (a, b) => {
    return a["date"] - b["date"];
  }

  const sortDateOldest = (a, b) => {
    return b["date"] - a["date"];
  }

  const handleDateClick = () => {
    console.log("clicked");
    let sortCopy = sort;
    let ticketsCopy = ticketsState;
    if (!sortCopy[1]) {
      if (!sortCopy[0]) {
        ticketsCopy.sort(sortDateRecent);
        setTickets(ticketsCopy);
        setSort([1, 0]);
      }
      else {
        ticketsCopy.sort(sortDateOldest);
        setTickets(ticketsCopy);
        setSort([0, 0])
      }
    }
  }

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

  const getTimeString = (t) => {
    let date = new Date(t);
    let hours = ConvertNumberToTwoDigitString(date.getHours());
    let minutes = ConvertNumberToTwoDigitString(date.getMinutes());
    let ampm = "";
    if (parseInt(hours) >= 12) {
      ampm = " pm";
      hours = (parseInt(hours) === 12) ? "12" : (parseInt(hours)-12).toString();
    }
    else {
      ampm = " am";
    }
    let time = hours + ":" + minutes + ampm;
    console.log(time);
    return time;
  }

  const ConvertNumberToTwoDigitString = (n) => {
    return n > 9 ? "" + n : "0" + n;
  }
  const QueueListItems = ticketsState.map(ticket => {
    if (showCompleted) {
      return(
        <ListItem button divider>
        <ListItemText><a className={stylesheet.links} href={'/ticket/'+ticket["quarter"]+"/"+ticket["exercise"]+"/"+ticket["ticket"]+"/"}><div className={stylesheet.ticketinfo}><b>{ticket["exercise"]} <br /> {ticket["message"]}</b> <p>{ticket["student_name"]}</p> <p>{getDateString(ticket["date"])}</p><p>{getTimeString(ticket["date"])}</p><p>{ticket["status"]}</p></div></a></ListItemText>
        </ListItem>

      );
    }
    else {
      if (ticket["status"] !== "Completed"){
        return(
          <ListItem button divider>
          <ListItemText><a className={stylesheet.links} href={'/ticket/'+ticket["quarter"]+"/"+ticket["exercise"]+"/"+ticket["ticket"]+"/"}><div className={stylesheet.ticketinfo}><b>{ticket["exercise"]} <br /> {ticket["message"]}</b> <p>{ticket["student_name"]}</p> <p>{getDateString(ticket["date"])}</p><p>{getTimeString(ticket["date"])}</p><p>{ticket["status"]}</p></div></a></ListItemText>
          </ListItem>

        );
      }
    }

    }
  );
  return(
    <Paper className={stylesheet.listPaper}>
    <List className={stylesheet.list}>
      <ListItem divider>
        <ListItemText><div className={stylesheet.ticketinfo}><p>Ticket</p><p>Name</p><Button style={{width: '50px'}} onClick={handleDateClick}>Date</Button><p>Time</p><p>Status</p><Button color="primary" onClick={()=>toggleCompleted(!showCompleted)}>Show Completed</Button></div></ListItemText>
      </ListItem>
      {QueueListItems}
    </List>
    </Paper>
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
    updateRoster();
  }, []);

  const [roster, setRoster] = useState({});

  const reroute = () => {
    const netID = localStorage.getItem('ma-netid');
    if(netID == null || netID == "") {
      alert("You are not logged in!");
      window.location.href = "/";
      return;
    }
    if((isStudent(netID)) && (window.location.href.indexOf("studentView") == -1)){
      window.location.href = "/newTicket/";
    }
    else if (isMentor(netID)){

    }
  }

  const updateRoster = () => {
    const database = firebase.database();
    const dbref = database.ref('/roster/');
    dbref.on('value', (snapshot) => {
      const db = snapshot.val();
      setRoster(db);
    });
  }

  useEffect(() => {
    if(Object.keys(roster).length != 0){
      reroute();
    }
  }, [roster]);

  const isStudent = (nid) => {
    if(Object.keys(roster).length == 0){
      return;
    }
    const db = roster;
    if(!(nid in db)){
      alert("incorrect netid!");
      window.location.href = "/";
      return false;
    }
    if(db[nid]["role"] == "student"){
      return true;
    }
    return false;
  }

  const isMentor = (nid) => {
    if(Object.keys(roster).length == 0){
      return;
    }
    const db = roster;
    if(!(nid in db)){
      alert("incorrect netid!");
      window.location.href = "/";
      return false;
    }
    if(db[nid]["role"] == "mentor"){
      return true;
    }
    return false;
  }

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
