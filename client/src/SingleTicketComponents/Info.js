import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TicketHeader from './InfoComponents/TicketHeader';
import StudentInfo from './InfoComponents/StudentInfo';
import TicketInfo from './InfoComponents/TicketInfo';
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
    fontFamily: 'Courier',
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

const Info = ({quarter, classes, id, ticket, exercis}) => {

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

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = async () => {
    let formSubmit = {
      student: {
        "name": name,
        "id": netID,
        "email": email
      },
      message: title,
      responses: [],
      patterns: null,
      source: exercise,
      textBlocks: blocks,
      category: "Error",
      status: "Unread"
    };

    if(formSubmit.message === "" || formSubmit.student.email === "" || formSubmit.student.id === "" || formSubmit.student.name === ""){
      alert("Please fill out the entire form.")
    }
    //else if(validateEmail(formSubmit.student.email) === false){
      //alert("Please use a valid email.")
    //}
    //else{
      const response = await fetch('https://secure-oasis-87770.herokuapp.com/api/form', {
        method: 'POST',
        body: JSON.stringify(formSubmit), // string or object
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://secure-oasis-87770.herokuapp.com/'
        }
      });

      const myJson = await response.json();
      console.log("myJson ====> ", myJson);
      let d = new Date();
      myJson["date"] = d.getTime();
      myJson["status"] = "Unread";
      myJson["student"]["email"] = email;
      let database = firebase.database();
      database.ref('winter2019/' + exercise + '/tickets/' + id + '/').update(myJson);
      alert("Your ticket was successfully updated.");
      //window.location.href = "/newticket/";
   // }
  }

  //handle the saving logic
  function handleSave() {
    const now = new Date;
    alert("Ticket " + id +" Saved at "+now.toLocaleTimeString());
    //TODO: fix database logic (almost working)
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
    });
    handleSubmit();
    //window.location.href = "/queue/";
  }

  return (
    <div>
        <TicketHeader date={ticket["date"]} status={status} setStatus={setStatus} title={title} setTitle={setTitle} exercise={exercise} setExercise={setExercise} submitDate={submitDate} setSubmitDate={setSubmitDate} exerciseProp={exercis} classes={classes} ticket={ticket} handleSave={handleSave} />
        <StudentInfo name={name} setName={setName} netID={netID} setNetID={setNetID} email={email} setEmail={setEmail} classes={classes} ticket={ticket} />
        <TicketInfo blocks={blocks} setBlocks={setBlocks} classes={classes} ticket={ticket}/>
    </div>

  )


};

export default withStyles(classes)(Info);
