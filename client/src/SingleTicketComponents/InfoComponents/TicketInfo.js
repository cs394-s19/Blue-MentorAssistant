import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { firebase } from '../../firebaseConfig';

const classes = {

};



const TicketInfo = ({classes, ticket}) => {
  const [blocks, setBlocks] = useState([]);

  console.log(blocks);
  const getTicketInfo = () =>
  {


   // console.log(ticket);
    console.log(ticket["textBlocks"]);
    setBlocks(ticket["textBlocks"]);

    // setCode(ticket['textBlocks']['0']['text']);
    // setOutput(ticket['textBlocks']['1']['text']);

  }
  useEffect(() => {
    getTicketInfo();
  },[ticket]);

  const convertType = (type) => {
    console.log(type);
    switch (type)  {
      case "computerOutput":
        return "Output";
      case "computerInput":
        return "Input";
      case "text":
        return "text";
      default:
        return type;
    }
  }
  return (
    <div>
      {
        blocks ?
        blocks.map((block) => {
          return(
              <div className={classes.titleDiv}>
              <TextField
                    id="outlined-multiline-static"
                    label={convertType(block["type"])}
                    multiline
                    rows="10"
                    defaultValue=""
                    value={block["text"]}
                    className={classes.codeField}
                    variant="outlined"
                  />
              </div>
            );
        })
        :
        <div></div>
      }
    </div>

  )
};

export default withStyles(classes)(TicketInfo);
