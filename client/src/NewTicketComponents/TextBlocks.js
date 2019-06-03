import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import Fab from '@material-ui/core/Fab';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';



const classes = {

  titleDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10px',
    marginLeft: 'Auto',
    marginRight: 'Auto',
  


  },

  pairTextDiv: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid blue',
    width: '90%',

  },

  inputPaper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '10px',
    marginLeft: 'Auto',
    marginRight: 'Auto',

  },
  addButton: {
    marginRight: '2%',
    marginTop: '20px',
    float: 'right',
  },
  blocksDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '10px',
    marginLeft: 'Auto',
    marginRight: 'Auto',


  },

  removeButton: {


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
    marginRight: '20px',


    // backgroundColor: '#FFFFFF',
  },


  removeDiv: {
    height: '50%',



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
    flexShrink: '4',
    padding: '10px',
  },
};


const TextBlocks = ({ classes, getBlocks }) => {
  const [blocks, updateBlocks] = useState([
    {
      type: '',
      text: ''
    }
  ]);
  const [numBlocks, updateNumBlocks] = useState(1);

  const setBlocks = (blockIndex, type, text, label) => {
    let blockInfo = {
      type: type,
      text: text,
      label: label
    };
    let blocksCopy = blocks;
    if (type === "sourceCode") {
      blocksCopy[blockIndex] = blockInfo;
    }
    else {
      blocksCopy[blockIndex+1] = blockInfo;
    }
    updateBlocks(blocksCopy);
    getBlocks(blocks);
  }

  const newBlock = () => {
    let blocksCopy = blocks;
    blocksCopy.push(
      {
        type: 'sourceCode',
        text: '',
        label: ''
      }
    );
    blocksCopy.push(
      {
        type: 'computerOutput',
        text: '',
        label: ''
      }
    );
    updateBlocks(blocksCopy);
    updateNumBlocks(numBlocks+2);
  }

  const deleteBlock = (index) => {
    let blocksCopy = blocks;
    //blocksCopy.splice(index, 1);
    blocksCopy[index] = null;
    blocksCopy[index+1] = null;
    updateBlocks(blocksCopy);
    updateNumBlocks(numBlocks-2);
  }

  return (
    <div className={classes.blocksDiv}>
      {blocks.map((block, index) => {
        if (block != null && index%2 === 0){
          return (<TextBlock classes={classes} updateTextBlock={setBlocks} blockIndex={index} deleteBlock={deleteBlock}></TextBlock>)
        }

      })}
      <div>
        <Fab color="primary" className={classes.addButton} aria-label="Add" onClick={()=>newBlock()}>
          <AddIcon />
        </Fab>

      </div>
    </div>
  );
}




const TextBlock = ({ classes, updateTextBlock, blockIndex, deleteBlock }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (value) => {
    setInput(value);
    updateTextBlock(blockIndex, "sourceCode", value, '');
  }

  const handleOutputChange = (value) => {
    setOutput(value);
    updateTextBlock(blockIndex, "computerOutput", value, '');
  }

  const handleDelete = (index) => {
    deleteBlock(index);
  }

  return (
    <div className={classes.titleDiv}>


        <TextField
            id="outlined-full-width"
            label="My Code"
            className={classes.titleField}
            value={input}
            onChange={({target}) => handleInputChange(target.value)}
            margin="normal"
            multiline
            rows={4}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
              id="outlined-full-width"
              label="Computer Output"
              className={classes.titleField}
              value={output}
              onChange={({target}) => handleOutputChange(target.value)}
              margin="normal"
              multiline
              rows={4}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

        <Button variant="outlined" color="secondary" className={classes.removeButton} aria-label="Remove" onClick={()=> handleDelete(blockIndex)} >
            <CancelIcon />
        </Button>

    </div>
  );
}

export default withStyles(classes)(TextBlocks);
