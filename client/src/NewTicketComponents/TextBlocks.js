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
    border: '2px solid red',

  },

  removeButton: {
      backgroundColor: "white"
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

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  const handleMenu = (index) => {
    setAnchorEl(null);
    setSelected(index);
    setType(inputTypes[index]);
    updateTextBlock(blockIndex, inputTypes[index], text, label);
  }

  function handleClose() {
    setAnchorEl(null);
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
      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {(type === '' ? "Type" : shownInputTypes[selected])}
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {inputTypes.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selected}
            onClick={event => handleMenu(index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
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
        <TextField
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
        />
        <Fab color="primary" className={classes.removeButton} aria-label="Remove" onClick={()=> handleDelete(blockIndex)} >
          <RemoveIcon />
        </Fab>
    </div>
  );
}

export default withStyles(classes)(TextBlocks);
