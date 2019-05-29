import React, {
  useState,
  useEffect
} from 'react';
import {
  withStyles
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import {
  firebase
} from '../../firebaseConfig';

const classes = {

};



const TicketInfo = ({
  classes,
  ticket,
  blocks,
  setBlocks
}) => {
  //console.log(blocks);
  const getTicketInfo = () => {
    //console.log(ticket["textBlocks"]);
    setBlocks(ticket["textBlocks"]);
  }
  useEffect(() => {
    getTicketInfo();
    console.log("blocks:" + blocks)
  }, [ticket]);

  const handleBlockChange = (e, idx) => {
    const newBlocks = JSON.parse(JSON.stringify(blocks));
    newBlocks[Number(idx)]["text"] = e.target.value;
    setBlocks(newBlocks);
  }

  const convertType = (type) => {
    //console.log(type);
    switch (type) {
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

  return ( <
    div > {
      blocks ?
      blocks.map((block, idx) => {
        return ( <
          div className = {
            classes.titleDiv
          } >
          <
          TextField id = {
            idx.toString()
          }
          label = {
            block["type"] ? convertType(block["type"]) : "       "
          }
          multiline rows = "10"
          defaultValue = ""
          value = {
            block["text"]
          }
          onChange = {
            (e) => handleBlockChange(e, idx.toString())
          }
          className = {
            classes.codeField
          }
          variant = "outlined" /
          >
          <
          /div>
        );
      }) :
        <
        div > < /div>
    } <
    /div>

  )
};

export default withStyles(classes)(TicketInfo);