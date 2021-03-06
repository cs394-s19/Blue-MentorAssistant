import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TicketHeader from '../SingleTicketComponents/InfoComponents/TicketHeader';
import TicketInfo from '../SingleTicketComponents/InfoComponents/TicketInfo';
import UserTypes from '../enums/UserTypes.js';
import MentorResponse from './MentorResponse.js';
import { firebase } from '../firebaseConfig';

const classes = {
  titleDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: '10px',
    marginLeft: 'Auto',
    marginRight: 'Auto',

  },

  statusDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',

    marginLeft: 'Auto',
    marginRight: 'Auto',
  },
  titleField: {
    display: 'flex',
    width: '100%',

    // backgroundColor: '#FFFFFF',
  },
  codeField: {
    display: 'flex',
    width: '100%',
  },
  statusField: {
    display: 'flex',

    width: '48%',

  },
  formControl: {
    display: 'flex',
    marginTop: '6px',
    width: '48%',

  },
};

const getDateString = (date) => {
  if(isNaN(Number(date))){
    console.log("queue view error: incorrect date string");
    return "";
  }
  const iso = new Date(Number(date)).toISOString();
  const year = iso.substring(0,4);
  const day = (iso.substring(8,10));
  const month = (iso.substring(5,7));
  return year+'-' + month+ '-'+day;
}

const StudentViewInfo = ({quarter, classes, id, ticket, exercis}) =>
{
  //ticket header
  const [title, setTitle] = useState(ticket["message"]);
  const [exercise, setExercise] = useState(exercis);
  const [submitDate, setSubmitDate] = useState(getDateString(ticket["date"]));
  const [status, setStatus] = useState("Opened");

  //student info
  const [name, setName] = useState(ticket["student"]["name"]);
  const [netID, setNetID] = useState(ticket["student"]["id"]);
  const [email, setEmail] = useState("john@gmail.com");

  //ticket info
  const [blocks, setBlocks] = useState([]);

  //handle the saving logic
  function handleSave() {
    const now = new Date;
    alert("NOT FIXED: Ticket " + id +" Saved at "+now.toLocaleTimeString());
    /*
    let database = firebase.database();
    database.ref(`${quarter}/${exercis}/tickets/${id}`).update({
      message: title,
      student: {
        id: netID,
        name: name,
      },
      status: status,
      //date: submitDate,
      textBlocks: blocks,
    });*/
    window.location.href = "/queue/";
  }

  return (
      <div>
          <TicketHeader date={ticket["date"]} status={status} setStatus={setStatus} title={title} setTitle={setTitle} exercise={exercise} setExercise={setExercise} submitDate={submitDate} setSubmitDate={setSubmitDate} exerciseProp={exercis} classes={classes} ticket={ticket} handleSave={handleSave} />       
          <TicketInfo blocks={blocks} setBlocks={setBlocks} classes={classes} ticket={ticket}/>
          <MentorResponse classes = {classes} ticket = {ticket} />
      </div>
  )
}

export default withStyles(classes)(StudentViewInfo);