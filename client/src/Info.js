import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'

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



const Info = ({classes}) => {

  return (
    <div>
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

    <div className={classes.titleDiv}>
        <TextField
             id="outlined-name"
             label="NetID"
             className={classes.statusField}
             value="vka5277"
             margin="normal"
             variant="outlined"
           />

           <TextField
                id="outlined-name"
                label="Name"
                className={classes.statusField}
                value="Victor Aung"

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
    <div className={classes.titleDiv}>
    <TextField
          id="outlined-multiline-static"
          label="Code"
          multiline
          rows="10"
          defaultValue=""
          value="(overlay/xy main-flag 90 90 beside my-star beside my-star beside my-star)"
          className={classes.codeField}
          variant="outlined"
        />
    </div>
    <div className={classes.titleDiv}>
    <TextField
          id="outlined-multiline-static"
          label="Output"
          multiline
          rows="10"
          defaultValue=""
          value="overlay/xy: expects only 4 arguments, but found 11."
          className={classes.codeField}
          variant="outlined"
        />
    </div>
    </div>

  )


};

export default withStyles(classes)(Info);
