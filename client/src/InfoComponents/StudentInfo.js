import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const classes = {
};



const StudentInfo = ({classes}) => {
  return (
    <div>
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
    </div>

  )
};

export default withStyles(classes)(StudentInfo);
