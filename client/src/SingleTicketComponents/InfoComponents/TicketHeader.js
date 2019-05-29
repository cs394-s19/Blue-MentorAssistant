import React, {
  useState,
  useEffect
} from 'react';
import {
  withStyles
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import {
  BrowserRouter,
  Route,
  Link
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBack from '@material-ui/icons/ArrowBack';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import {
  firebase
} from '../../firebaseConfig';

const classes = {
  grow: {
    flexGrow: 1,
  },
};



const TicketHeader = ({
    date,
    classes,
    ticket,
    userType,
    exerciseProp,
    handleSave,
    title,
    setTitle,
    exercise,
    setExercise,
    submitDate,
    setSubmitDate,
    status,
    setStatus
  }) => {
    const [submitTime, setSubmitTime] = useState(ticket["date"]);
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    }

    const handleDateChange = (e) => {
      setSubmitDate(e.target.value);
    }

    const handleSaveBtn = () => {
      handleSave();
    }

    const handleSelectChange = (e) => {
      setStatus(e.target.value);
    }

    const GetTicketHeader = () => {
      setTitle(ticket['message']);
      setSubmitDate(getDateString(date));
      setSubmitTime(getTimeString(ticket['date']));
      setExercise(exerciseProp);

    }

    const getDateString = (date) => {
      console.log(date);
      if (isNaN(Number(date))) {
        console.log("queue view error: incorrect date string");
        return "";
      }
      const iso = new Date(Number(date)).toISOString();
      const year = iso.substring(0,4);
      const day = (iso.substring(8,10));
      const month = (iso.substring(5,7));
      return year+'-' + month+ '-'+day;
    }

      const getTimeString = (t) => {
        let date = new Date(t);
        let hours = ConvertNumberToTwoDigitString(date.getHours());
        let minutes = ConvertNumberToTwoDigitString(date.getMinutes());
        let ampm = "";
        if (parseInt(hours) >= 12) {
          ampm = " pm";
          hours = (parseInt(hours) === 12) ? "12" : (parseInt(hours) - 12).toString();
        } else {
          ampm = " am";
        }
        let time = hours + ":" + minutes + ampm;
        console.log(time);
        return time;
      }

      const ConvertNumberToTwoDigitString = (n) => {
        return n > 9 ? "" + n : "0" + n;
      }

      useEffect(() => {
        GetTicketHeader();
      }, [ticket]);

      return ( 
        <div>
        <AppBar position = "static" >
        <Toolbar >
        <IconButton className = {
          classes.menuButton
        }
        color = "inherit"
        aria-label = "Menu" >
        <Link to = "/queue/"
        style = {
          {
            textDecoration: 'none',
            color: 'white'
          }
        } >
        <ArrowBack / >
        </Link> </IconButton> 
        <Typography variant = "h6"
        color = "inherit"
        className = {
          classes.grow
        } >
        Ticket </Typography> <Button onClick = {
          handleSaveBtn
        }
        color = "inherit" > Save 
        </Button> 
        </Toolbar> 
        </AppBar>

        <div className = {
          classes.titleDiv
        } >


        <TextField id = "filled-exercise"
        label = "Exercise"
        className = {
          classes.titleField
        }
        placeholder = "Exercise"
        value = {
          exercise
        }
        margin = "normal"
        variant = "outlined"

        />
        </div>

        <div className = {
          classes.titleDiv
        } >


        <TextField id = "filled-name"
        label = "Title"
        className = {
          classes.titleField
        }
        placeholder = "Placeholder"
        value = {
          title
        }
        margin = "normal"
        variant = "outlined"
        onChange = {
          handleTitleChange
        }/> 
        </div>

        <div className = {
          classes.statusDiv
        } > {
          /* <FormControl className={classes.formControl} variant="outlined">
                     <InputLabel>
                     Time Submitted
                     </InputLabel>
                      <Select
                              value={status}
                              onChange={handleSelectChange}
                              input={<OutlinedInput
                                name="age"
                                id="age-label-placeholder"
                                labelWidth= {44}
                                 />}
                            >
                              <MenuItem value={0}>Open</MenuItem>
                              <MenuItem value={1}>Completed</MenuItem>
                      </Select>
                  </FormControl> */
        }

        <FormControl className = {
          classes.formControl
        } >
        <TextField id = "date"
        label = "Time Submitted"
        defaultValue = {
          submitTime
        }
        value = {
          submitTime
        }
        className = {
          classes.textField
        }
        InputLabelProps = {
          {
            shrink: true,
          }
        }
        variant = "outlined" /
        >
        </FormControl>


        <FormControl className = {
          classes.formControl
        } >
        <TextField id = "date"
        label = "Date Submitted"
        type = "date"
        value = {
          submitDate
        }
        className = {
          classes.textField
        }
        InputLabelProps = {
          {
            shrink: true,
          }
        }
        onChange = {
          handleDateChange
        }
        variant = "outlined" /
        >
        </FormControl> 
        </div> 
        </div>

      )
    };

    export default withStyles(classes)(TicketHeader);