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
import { firebase } from '../firebaseConfig';

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
    width: '1200px',
    height: '750px',


  },

  emailDiv: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '2%',
    border: '2px solid red',

  },

  toField: {
    position: 'relative',
    width: '100%',
        marginTop: '10px',

  },

  subjectField: {
    position: 'relative',
    marginTop: '10px',
    width: '100%',

  },

  bodyField: {
    position: 'relative',
    marginTop: '10px',
    width: '100%',

  },

};

const Footer = ({classes, ticket, id, quarter, exercise}) => {
  const [isModalOpen, toggleModal] = useState(false)

  const handleModal = () => {
    toggleModal(!isModalOpen);
    console.log(isModalOpen);
  };

  const handleSubmit = () => {
    let database = firebase.database();
    database.ref(`${quarter}/${exercise}/tickets/${id}`).update({ status: 'Completed'});
  }

  return (
    <div>
      <div className={classes.openModalBtn}>
        <Button onClick={handleModal} variant="contained" color="primary" className={classes.openModalBtn}>Send Email</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" className={classes.openModalBtn}>Complete</Button>
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open= {isModalOpen}
        onClose={handleModal}
      >
        <Paper className={classes.emailForm}>
          <div className={classes.emailDiv}>
            <Typography variant="h5" className={classes.typography}>
              Send Email:
            </Typography>
            <TextField
                disabled
                id="outlined-multiline-static"
                label="To:"
                multiline
                rows="1"
                defaultValue=""
                value="VictorAung2021@u.northwestern.edu"
                className={classes.toField}
                variant="outlined"
            />

            <TextField
                id="outlined-multiline-static"
                label="Subject:"
                multiline
                rows="1"
                defaultValue=""
                value="test"
                className={classes.subjectField}
                variant="outlined"
            />

            <TextField
                id="outlined-multiline-static"
                label="Body:"
                multiline
                rows="16"
                defaultValue=""
                value="test"
                className={classes.bodyField}
                variant="outlined"
            />

            <Typography variant="h5" className={classes.typography}>
              Suggestions
            </Typography>
          </div>
        </Paper>
      </Modal>
    </div>
  )
};
export default withStyles(classes)(Footer);
