import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as database from '../../databaseHelpers';
import { firebase } from '../../firebaseConfig';

const classes = {
};



const StudentInfo = ({classes, ticket, name, setName, netID, setNetID, email, setEmail}) => {

  const getStudentInfo = () =>
  {
    console.log(ticket);
    setName(ticket['student']['name']);
    setNetID(ticket['student']['id']);
    setEmail(ticket['student']['email'])
  }
  useEffect(() =>
  {
    getStudentInfo();
  }, [ticket]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleNetIDChange = (e) => {
    setNetID(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  return (
    <div>
      <div className={classes.titleDiv}>
          <TextField
               id="outlined-name"
               label="NetID"
               className={classes.statusField}
               value={netID}
               onChange={handleNetIDChange}
               margin="normal"
               variant="outlined"
             />

             <TextField
                  id="outlined-name"
                  label="Name"
                  className={classes.statusField}
                  value={name}
                  onChange={handleNameChange}
                  margin="normal"
                  variant="outlined"
                />
      </div>
      <div className={classes.titleDiv}>
      <TextField
            id="outlined-full-width"
            label="Email"
            className={classes.titleField}
            onChange={handleEmailChange}
            value={email}

            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
      </div>
    </div>

  )
};

export default withStyles(classes)(StudentInfo);
