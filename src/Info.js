import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
  titleField: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  codeField: {
    display: 'flex',
    width: '100%',
  },
  statusField: {
    display: 'flex',

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

          margin="normal"
          variant="outlined"
          variant="filled"
        />
    </div>

    <div className={classes.titleDiv}>
        <TextField
             id="outlined-name"
             label="Status"
             className={classes.statusField}
             value="hello"

             margin="normal"
             variant="outlined"
           />

           <TextField
                id="outlined-name"
                label="Date Submitted"
                className={classes.statusField}
                value="hello"

                margin="normal"
                variant="outlined"
              />
    </div>
    <div className={classes.titleDiv}>
        <TextField
             id="outlined-name"
             label="NetID"
             className={classes.statusField}
             value="hello"
             margin="normal"
             variant="outlined"
           />

           <TextField
                id="outlined-name"
                label="Name"
                className={classes.statusField}
                value="hello"

                margin="normal"
                variant="outlined"
              />
    </div>
    <div className={classes.titleDiv}>
    <TextField
          id="outlined-full-width"
          label="Email"
          className={classes.titleField}
          placeholder="Placeholder"

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
          defaultValue="Default Value"
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
          defaultValue="Default Value"
          className={classes.codeField}
          variant="outlined"
        />
    </div>
    </div>

  )


};

export default withStyles(classes)(Info);
