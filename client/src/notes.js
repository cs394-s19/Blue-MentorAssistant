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
import { firebase } from './firebaseConfig';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = makeStyles({
  wrapper: {
    background: "linear-gradient(to bottom, rgba(240,249,255,1)  0%,rgba(203,235,255,1) 47%,rgba(161,219,255,1) 100%)",
    height: '1000px',
    width: '100%',
  },
  app: {
    fontFamily: 'Roboto',
    height: '100%',
    marginLeft: '10%',
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



const Note = ({notes, styles}) => {
  const stylesheet = styles();
  const NoteListItems = notes.map(note =>
  <ListItemText><div className={stylesheet.ticketinfo}><b>{note["message"]}<br /> </b> </div></ListItemText>
  );
  return(
    <List className={stylesheet.list}>
      <ListItemText><div className={stylesheet.ticketinfo}><p>Message</p></div></ListItemText>
      {NoteListItems}
    </List>
  );
}

const NotesView = () => {
  const stylesheet = styles();

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
          "note": "",
          "message": "",
        };

        const new_notes = keys.map(n => {
          const nt = JSON.parse(JSON.stringify(blankNote));
          nt["note"] = n;
          nt["message"] = db[n]["message"];
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
      <left>
        <Note styles={styles} notes = {notes} />
      </left>
    </div>
  </div>
  );
}

export default NotesView;
