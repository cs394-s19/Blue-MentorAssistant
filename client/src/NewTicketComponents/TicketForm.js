import React, { useState } from 'react';
import TextBlocks from './TextBlocks';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
  const [exercise, setExercise] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    };
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
    let database = firebase.database();
    database.ref('winter2019/' + exercises[selectedIndex] + '/tickets').push(myJson);


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
    setAnchorEl(event.currentTarget);
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
          label="Describe your problem"
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
      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {exercise === '' ? "Select an exercise" : exercises[selectedIndex]}
      </Button>
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
      <div className={classes.titleDiv}>
        <TextBlocks classes={classes} getBlocks={getBlocks}></TextBlocks>
      </div>
      <div className={classes.titleDiv}>
      <Button size="Large" onClick={() => handleSubmit()} variant="contained" color="primary" className={classes.button}>Submit</Button>
      </div>
    </div>
  );
}

export default withStyles(classes)(TicketForm);
