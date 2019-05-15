import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import { Divider } from '@material-ui/core';

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
  const CSS_styles = styles();
  const navigateTo = (url) => {
    window.location.href = url;
  }
  const navigateToStudents = () => {navigateTo("/newticket/");}
  const navigateToMentors = () => {navigateTo("/queue/");}
  const navigateToSingleTicket = () => {navigateTo("/ticket/2/");}
  return (
    <div>
      <h1>Mentor's Assistant</h1>
      <div className={CSS_styles.buttons}>
        <Fab variant="extended" onClick={navigateToStudents} color="primary" aria-label="Add">
          Students
        </Fab>&nbsp; &nbsp;
        <Fab variant="extended" onClick={navigateToMentors} color="primary" aria-label="Add">
          Mentors
        </Fab> </div>
        <br />
        <Divider />
        <br />
        <Fab variant="extended" onClick={navigateToSingleTicket} color="primary" aria-label="Add">
          See Example of Single Ticket
        </Fab> 
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
