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
import RemoveIcon from '@material-ui/icons/Remove';
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
    width: '90%',
    marginTop: '10px',
    marginLeft: 'Auto',
    marginRight: 'Auto',


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

    float: 'right',
  },
  blocksDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '90%',
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
    marginTop: '4%',
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
    blocksCopy[blockIndex] = blockInfo;
    updateBlocks(blocksCopy);
    getBlocks(blocks);
  }

  const newBlock = () => {
    let blocksCopy = blocks;
    blocksCopy.push(
      {
        type: '',
        text: '',
        label: ''
      }
    )
    updateBlocks(blocksCopy);
    updateNumBlocks(numBlocks+1);
  }

  const deleteBlock = (index) => {
    let blocksCopy = blocks;
    blocksCopy.splice(index);
    updateBlocks(blocksCopy);
    updateNumBlocks(numBlocks-1);
  }

  return (
    <div className={classes.blocksDiv}>
      {blocks.map((block, index) => (
        <TextBlock classes={classes} updateTextBlock={setBlocks} blockIndex={index} deleteBlock={deleteBlock}></TextBlock>
      ))}
      <div>
        <Fab color="primary" className={classes.addButton} aria-label="Add" onClick={()=>newBlock()}>
          <AddIcon />
        </Fab>

      </div>
    </div>
  );
}




const TextBlock = ({ classes, updateTextBlock, blockIndex, deleteBlock }) => {
  const [type, setType] = useState('');
  const [label, setLabel] = useState('');
  const [text, setText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(-1);

  // function handleClick(event) {
  //   setAnchorEl(event.currentTarget);
  // }

  // const handleMenu = (index) => {
  //   setAnchorEl(null);
  //   setSelected(index);
  //   setType(inputTypes[index]);
  //   updateTextBlock(blockIndex, inputTypes[index], text, label);
  // }



  // function handleClose() {
  //   setAnchorEl(null);
  // }

  const handleType = (event) => {
    setType(event.target.value);
    updateTextBlock(blockIndex, event.target.value, text, label);
  }

  const handleTextChange = (value) => {
    setText(value);
    updateTextBlock(blockIndex, type, value, label);
  }

  const handleLabelChange = (value) => {
    setLabel(value);
    updateTextBlock(blockIndex, type, text, value);
  }

  const handleDelete = (index) => {
    deleteBlock(index);
  }


  const inputTypes = [
    'sourceCode',
    'computerOutput',
    'ConfusionInput',
    'StuckInput',
    'expectedOutput'
  ];

  const shownInputTypes = [
    'Source Code',
    'Computer Output',
    'Confusion Input',
    'Stuck Input',
    'Expected Output'
  ];

  return (
    <div className={classes.titleDiv}>
      <Paper className={classes.inputPaper} elevation = {2}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Type of Input</FormLabel>
          <RadioGroup
            name="InputType"
            className={classes.group}
            value={type}
            onChange={handleType}
          >
          <FormControlLabel
            value="stuckInput"
            control={<Radio color="primary" />}
            label="Text"

          />
          <FormControlLabel
            value="computerInput"
            control={<Radio color="primary" />}
            label="Input"

          />
          <FormControlLabel
            value="computerOutput"
            control={<Radio color="primary" />}
            label="Output"

          />


        </RadioGroup>

      </FormControl>

        <TextField
            id="outlined-full-width"
            label="Text"
            className={classes.titleField}
            value={text}
            onChange={({target}) => handleTextChange(target.value)}
            margin="normal"
            multiline
            rows={3}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

        {/* <TextField
          id="outlined-full-width"
          label="Label"
          className={classes.titleField}
          value={label}
          onChange={({target}) => handleLabelChange(target.value)}
          margin="normal"
          multiline
          rows={3}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        /> */}
        <Button variant="outlined" color="secondary" className={classes.removeButton} aria-label="Remove" onClick={()=> handleDelete(blockIndex)} >
            <RemoveIcon />
        </Button>
        </Paper>

    </div>
  );
}

export default withStyles(classes)(TextBlocks);
