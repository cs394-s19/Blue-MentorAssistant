import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const classes = {
};



const TicketHeader = ({classes}) => {
  return (
    <div>
      <AppBar position="static">
           <Toolbar>
             <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
               <MenuIcon />
             </IconButton>
             <Typography variant="h6" color="inherit" className={classes.grow}>
                Ticket 103201
             </Typography>
             <Button color="inherit">Save</Button>
           </Toolbar>
         </AppBar>
      <div className={classes.titleDiv}>


      <TextField
            id="filled-name"
            label="Title"
            className={classes.titleField}
            placeholder="Placeholder"
            value=" I’m getting an error when I try to use function overlay/xy"
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
               defaultValue="2019-05-10"
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
