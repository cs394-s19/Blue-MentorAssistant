import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const classes = {

};



const TicketInfo = ({classes}) => {
  return (
    <div>
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

export default withStyles(classes)(TicketInfo);
