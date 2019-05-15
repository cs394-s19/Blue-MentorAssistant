import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as database from '../databaseHelpers';
import { firebase } from '../firebaseConfig';

const classes = {
};



const StudentInfo = ({classes, ticket}) => {
  const [name, setName] = useState("...");
  const [netID, setNetID] = useState("...")
  const [email, setEmail] = useState("...")

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



  return (
    <div>
      <div className={classes.titleDiv}>
          <TextField
               id="outlined-name"
               label="NetID"
               className={classes.statusField}
               value={netID}
               margin="normal"
               variant="outlined"
             />

             <TextField
                  id="outlined-name"
                  label="Name"
                  className={classes.statusField}
                  value={name}

                  margin="normal"
                  variant="outlined"
                />
      </div>
      <div className={classes.titleDiv}>
      <TextField
            id="outlined-full-width"
            label="Email"
            className={classes.titleField}

            value="VictorAung2021@u.northwestern.edu"

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
