import React, { useState } from 'react';
import TextBlocks from './TextBlocks';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { firebase } from '../firebaseConfig';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';


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
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '2%',
  },
};


const TicketForm = ({ classes }) => {
  const [name, setName] = useState('');
  const [netID, setNetID] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [textBlocks, setTextBlocks] = useState([]);
  const [exercise, setExercise] = useState('exercise1');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      message: message,
      responses: [],
      patterns: null,
      source: exercises[selectedIndex],
      textBlocks: textBlocks,
      category: "Error",
      status: "Unread"
    };

    if(formSubmit.message === "" || formSubmit.student.email === "" || formSubmit.student.id === "" || formSubmit.student.name === ""){
      alert("Please fill out the entire form.")
    }
    else if(validateEmail(formSubmit.student.email) === false){
      alert("Please use a valid email.")
    }
    else{
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
      let database = firebase.database();
      database.ref('winter2019/' + exercises[selectedIndex] + '/tickets').push(myJson);
      alert("Your ticket was successfully submitted.");
      //window.location.href = "/newticket/";
    }
  }

  const exercises = [
    "exercise1",
    "exercise2",
    "exercise3",
    "exercise4",
    "exercise5",
    "exercise6"
  ];

  function handleClick(event) {
    // setAnchorEl(event.currentTarget);
    setExercise(event.target.value);
  }

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    setExercise(exercises[selectedIndex]);
    setAnchorEl(null);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const getBlocks = (blocks) => {
    setTextBlocks(blocks);
  }

  return (
    <div>
      <div className={classes.titleDiv}>
        <TextField
          id="outlined-name"
          label="NetID"
          className={classes.statusField}
          value={netID}
          onChange={(e) => setNetID(e.target.value)}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="outlined-name"
          label="Name"
          className={classes.statusField}
          value={name}
          onChange={({target}) => setName(target.value)}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className={classes.titleDiv}>
        <TextField
          id="outlined-full-width"
          label="Email"
          className={classes.titleField}
          value={email}
          onChange={({target}) => setEmail(target.value)}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className={classes.titleDiv}>
        <TextField
          id="outlined-full-width"
          label="Problem Description"
          className={classes.titleField}
          value={message}
          onChange={({target}) => setMessage(target.value)}
          margin="normal"
          multiline
          rows={3}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className={classes.titleDiv}>


      <Select
          value={exercise}
          onChange={handleClick}
          input={<OutlinedInput name="age" id="outlined-age-simple" />}
        >

          {exercises.map((ex,index) => {
            return <MenuItem value={ex}>{ex}</MenuItem>
          })}

        </Select>

      <Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {exercises.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
        </Menu>
      </div>

      <TextBlocks classes={classes} getBlocks={getBlocks}></TextBlocks>

      <div className={classes.titleDiv}>
      <Button size="Large" onClick={() => handleSubmit()} variant="contained" color="primary" className={classes.button}>Submit</Button>
      </div>
    </div>
  );
}

export default withStyles(classes)(TicketForm);
