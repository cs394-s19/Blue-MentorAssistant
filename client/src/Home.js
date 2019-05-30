import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import { Divider } from '@material-ui/core';
import { firebase } from './firebaseConfig';
import TextField from '@material-ui/core/TextField';

const styles = makeStyles({
  app: {
    background: "linear-gradient(to bottom, rgba(240,249,255,1)  0%,rgba(203,235,255,1) 47%,rgba(161,219,255,1) 100%)",
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
  },
  centeredGrid: {
    border: '1px solid #303F9E',
    borderRadius: '25px',
    padding: '50px',
  },
});

const SelectPage = () => {

  const [loginText, setLoginText] = useState("");
  const [roster, setRoster] = useState({});

  const reroute = () => {
    const netID = localStorage.getItem('ma-netid');
    if(netID == null || netID == "") {
      //alert("login error: incorrect or nonexistent login. be sure to enable localstorage");
      return;
    }
    let redir = "";
    if(isStudent(netID)){
      redir = "/newticket/";
    }
    else if (isMentor(netID)){
      redir = "/queue/";
    }
    window.location.href = redir;
  }

  const updateRoster = () => {
    const database = firebase.database();
    const dbref = database.ref('/roster/');
    dbref.on('value', (snapshot) => {
      const db = snapshot.val();
      setRoster(db);
    });
  }

  useEffect(() => {
    updateRoster();
    //reroute();
  }, []);

  const CSS_styles = styles();

  const isStudent = (nid) => {
    const db = roster;
    if(!nid in db){
      alert("incorrect netid!");
      return false;
    }
    if(db[nid]["role"] == "student"){
      return true;
    }
    return false;
  }

  const isMentor = (nid) => {
    const db = roster;
    if(!nid in db){
      alert("incorrect netid!");
      return false;
    }
    if(db[nid]["role"] == "mentor"){
      return true;
    }
    return false;
  }

  const handleLogin = () => {
    alert("You have logged in with netID: " + loginText);
    localStorage.setItem('ma-netid', loginText);
    reroute();
  }

  const handleLoginChange = (e) => {
    setLoginText(e.target.value);
  }

  return (
    <div>
      <h1>Mentor's Assistant</h1>
      <TextField
        id="standard-name"
        label="Name"
        className={CSS_styles.textField}
        value={loginText}
        onChange={handleLoginChange}
        margin="normal"
      />
      <div className={CSS_styles.buttons}>
        <Fab variant="extended" onClick={handleLogin} color="primary" aria-label="Add">
          Login
        </Fab>&nbsp; &nbsp;
      </div>
    </div>
  );
}

const Home = () => {
  const CSS_styles = styles();
  return (
    <div className={CSS_styles.app}>
      <Grid
        container
        spacing={10}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >

        <Grid className={CSS_styles.centeredGrid} item xs={3}>
          <SelectPage />
        </Grid>

      </Grid>
    </div>
  );
}

export default Home;
