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

const styles = makeStyles({
  wrapper: {
    background: "linear-gradient(to bottom, rgba(240,249,255,1)  0%,rgba(203,235,255,1) 47%,rgba(161,219,255,1) 100%)",
    height: '1000px',
    width: '100%',
  },
  app: {
    fontFamily: 'Roboto',
    height: '100%',
  },
  appbarwrapper: {
    width: '60%',
  },
  appbar: {

  },
  toolbar: {

  },
  list: {
    width: '60%',
  },
  ticketinfo: {
    display: 'grid',
    gridTemplateColumns: '450px 170px 150px 50px',
  },
  links: {
    color: 'black',
    textDecoration: 'none',
  },
});


const InternalNotes = ({classes, ticket}) => {
  const [isModalOpen, toggleModal] = useState(false)

  const handleModal = () => {
    toggleModal(!isModalOpen);
    console.log(isModalOpen);
  };

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


      </Paper>
    </Modal>

  </div>

  )
};

const Note = ({notes, styles}) => {
  const stylesheet = styles();
  const NoteListItems = notes.map(note =>
  <ListItemText><a className = {stylesheet.links} href={'/winter2019/exercise1/notes/' + note["note"]}><div className={stylesheet.ticketinfo}><b>{note["message"]}    <br /> </b> </div></a></ListItemText>
  );
  console.log(NoteListItems);
  return(
    <List className={stylesheet.list}>
        <ListItemText><div className={stylesheet.ticketinfo}><p>Note</p><p>Message</p></div></ListItemText>
      {NoteListItems}
    </List>
  );
}

const NotesView = () => {
  const stylesheet = styles();

  const debugger_note = [
    {
      "note": "0",
      "message": "test",
    }
  ];

  const [notes, updateNotes] = useState([]);

  useEffect(() => {
    const getData = () => {
      const database = firebase.database();
      const dbref = database.ref('/winter2019/exercise1/notes/');
      dbref.on('value', (snapshot) => {
        const db = snapshot.val();
        console.log(db);
        const keys = Object.keys(db).filter(k => !isNaN(Number(k)));
        const blankNote = {
          "note": "0",
          "message": "",
        };

        const new_notes = keys.map(n => {
          const nt = JSON.parse(JSON.stringify(blankNote));
          nt["note"] = n;
          nt["message"] = db[n]["message"];
          console.log(nt)
          return nt;
        });
        updateNotes(new_notes);
      });
    }
    getData();
  }, []);

  return(
  <div className={stylesheet.wrapper}>
    <div className={stylesheet.app}>
      <center>
        <Note styles={styles} notes = {notes} />
      </center>
    </div>
  </div>
  );
}

export default withStyles(classes)(InternalNotes);
