import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { firebase } from '../../firebaseConfig';

const classes = {

};



const TicketInfo = ({classes, ticket}) => {
  const [code, setCode] = useState("...");
  const [output, setOutput] = useState("...")


  const getTicketInfo = () =>
  {


    console.log(ticket);

    // setCode(ticket['textBlocks']['0']['text']);
    // setOutput(ticket['textBlocks']['1']['text']);

  }
  useEffect(() => {
    getTicketInfo();
  },[ticket]);
  return (
    <div>
      <div className={classes.titleDiv}>
      <TextField
            id="outlined-multiline-static"
            label="Code"
            multiline
            rows="10"
            defaultValue=""
            value={code}
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
            value={output}
            className={classes.codeField}
            variant="outlined"
          />
      </div>
    </div>

  )
};

export default withStyles(classes)(TicketInfo);
