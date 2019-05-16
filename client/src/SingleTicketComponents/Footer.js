import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const classes = {
  root: {
    backgroundColor: "white",
  },

  typography: {

  },
  suggestionsDiv: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
  },
  suggestionPaper: {
    marginTop: '5px',
  },
  allSuggestions: {

  },
  typographyDiv: {
    width: '100%',
  },
  openModalBtn: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',

    textAlign: 'center',
  },

  emailForm: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    height: '200px',

  },

};

const Footer = ({classes, ticket}) => {
  const [isModalOpen, toggleModal] = useState(false)

  const handleModal = () => {
    toggleModal(!isModalOpen);
    console.log(isModalOpen);
  };

  return (
    <div>
      <div className={classes.openModalBtn}>

        <Button onClick={handleModal} variant="contained" color="primary" className={classes.openModalBtn}>Send Email</Button>

      </div>








    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open= {isModalOpen}
      onClose={handleModal}
    >
      <Paper className={classes.emailForm}>

        <Typography variant="h6" id="modal-title">
          Text in a modal
        </Typography>
        <div className={classes.titleDiv}>
        <TextField
              id="outlined-multiline-static"
              label="Code"
              multiline
              rows="10"
              defaultValue=""
              value="test"
              className={classes.codeField}
              variant="outlined"
            />
        </div>


      </Paper>
    </Modal>
  </div>

  )
};
export default withStyles(classes)(Footer);
