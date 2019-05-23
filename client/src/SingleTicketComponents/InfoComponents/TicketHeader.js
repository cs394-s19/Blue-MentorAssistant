import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import { BrowserRouter, Route, Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBack from '@material-ui/icons/ArrowBack';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import { firebase } from '../../firebaseConfig';

const classes = {
  grow: {
    flexGrow: 1,
  },
};



const TicketHeader = ({classes, ticket, userType}) => {
  const [title, setTitle] = useState("...");
  const [exercise, setExercise] = useState("...");
  const [submitDate, setSubmitDate] = useState("...")

  const GetTicketHeader = () =>
  {
    setTitle(ticket['message']);
    setSubmitDate(ticket['date']);
    setExercise(ticket['exercise']);
  }


  useEffect(() =>
  {
    console.log(ticket['message']);
    GetTicketHeader();
  },[ticket]);
  return (
    <div>
      <AppBar position="static">
           <Toolbar>
             <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <Link to="/queue/" style={{textDecoration: 'none', color: 'white'}}>
                  <ArrowBack />
                </Link>
             </IconButton>
             <Typography variant="h6" color="inherit" className={classes.grow}>
              Ticket
             </Typography>
             <Button color="inherit">Save</Button>
           </Toolbar>
         </AppBar>

         <div className={classes.titleDiv}>


      <TextField
            id="filled-exercise"
            label="Exercise"
            className={classes.titleField}
            placeholder="Exercise"
            value={exercise}
            margin="normal"
            variant="outlined"

          />
      </div>

      <div className={classes.titleDiv}>


      <TextField
            id="filled-name"
            label="Title"
            className={classes.titleField}
            placeholder="Placeholder"
            value={title}
            margin="normal"
            variant="outlined"

          />
      </div>

      <div className={classes.statusDiv}>
       <FormControl className={classes.formControl} variant="outlined">
           <InputLabel>
           Status
           </InputLabel>
            <Select
                    value={0}

                    input={<OutlinedInput
                      name="age"
                      id="age-label-placeholder"
                      labelWidth= {44}
                       />}
                  >
                    <MenuItem value={0}>Open</MenuItem>
                    <MenuItem value={1}>Completed</MenuItem>
            </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
             <TextField
               id="date"
               label="Date Submitted"
               type="date"
               defaultValue={submitDate}
               value={submitDate}
               className={classes.textField}
               InputLabelProps={{
                 shrink: true,
               }}
                variant="outlined"
             />
        </FormControl>
        </div>
      </div>

  )
};

export default withStyles(classes)(TicketHeader);
