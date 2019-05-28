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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/styles';
import HelpOutline from '@material-ui/icons/HelpOutline';
import { firebase } from '../firebaseConfig';
import ReactHtmlParser from 'react-html-parser';

const classes = {
  root: {
    backgroundColor: "white",
  },

  typography: {

  },
  notesDiv: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
  },
  notePaperDiv: {
    marginBottom: '10px',


  },
  allnotes: {

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
  },
  bodyField: {
    position: 'relative',
    width: '100%'
  },
  newMessageDiv: {
    position: 'absolute',
    bottom: '20px',
    width: '90%'
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '2%',
    marginTop: '5px'
  }
};


const InternalNotes = ({exercise, classes, ticket, quarter}) => {
  const [isModalOpen, toggleModal] = useState(false);
  const [newNote, updateNewNote] = useState('');

  const handleModal = () => {
    toggleModal(!isModalOpen);
  };
  const handleSubmit = () => {
    const database = firebase.database();
    const ref = database.ref(`${quarter}/${exercise}/notes`);
    const fullNote = {
      "note": "0",
      "message": newNote,
    };
    ref.push(fullNote);
    updateNewNote('');
  }

  return (
    <div>
      <div className={classes.openModalBtn}>
        <Button onClick={handleModal} variant="contained" color="primary" className={classes.openModalBtn}>See Notes</Button>
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
              Notes for {exercise}:
            </Typography>
            <NotesView quarter={quarter} exercise={exercise} classes={classes}/>
            <div className={classes.newMessageDiv}>
              <TextField
                id="outlined-multiline-static"
                label="Body:"
                multiline
                rows="3"
                defaultValue=""
                value={newNote}
                className={classes.bodyField}
                onChange={({target}) => updateNewNote(target.value)}
                variant="outlined"
              />
              <Button size="Large" onClick={() => handleSubmit()} variant="contained" color="primary" className={classes.button}>Add Note</Button>
            </div>
          </div>
        </Paper>
      </Modal>
    </div>
  )
};

const Note = ({notes, classes}) => {
  return(
    <div>
      {
        notes.map((note) => {
          return(
            <div className={classes.notePaperDiv}>
            <Paper className={classes.notePaper} elevation = {2}>
              <ListItem>
                <ListItemText
                  primary={note["message"]}
                  />
                </ListItem>
            </Paper>
            </div>
          );
        })
      }
    </div>
  );
}

const NotesView = ({quarter, exercise, classes}) => {

  const [notes, updateNotes] = useState([]);

  useEffect(() => {
    const getData = () => {
      const database = firebase.database();
      const dbref = database.ref(`${quarter}/${exercise}/notes`);
      dbref.on('value', (snapshot) => {
        if (snapshot.val()) {
          const db = snapshot.val();
          const keys = Object.keys(db);

          const blankNote = {
            "note": "0",
            "message": "",
          };

          const new_notes = keys.map(n => {
            const nt = JSON.parse(JSON.stringify(blankNote));
            nt["note"] = n;
            nt["message"] = db[n]["message"];
            return nt;
          });
          updateNotes(new_notes);
        }
      });

    }

    getData();
  }, []);

  return(
    <Note notes={notes} classes={classes} />
  );
}

export default withStyles(classes)(InternalNotes);
