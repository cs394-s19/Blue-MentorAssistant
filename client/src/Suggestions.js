import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';



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
  emailForm: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    height: '200px',

  },
};

const Suggestions = ({classes, ticket}) => {
  const [isModalOpen, toggleModal] = useState(false)

  const handleModal = () => {
    toggleModal(!isModalOpen);
    console.log(isModalOpen);
  };

  const [sug0, setSug0] = useState("...")
  const [sug1, setSug1] = useState("...")

  // TODO: Map the suggestions properly instead of naïvely assuming that there will be only two

  const getSuggestions = () =>
  {
    setSug0(ticket['response']['0']);
    setSug1(ticket['response']['1']);
  }
  useEffect(() =>
  {
    getSuggestions();
  },[ticket]);

  return (

    <div className={classes.suggestionsDiv}>

      <div className={classes.typographyDiv}>
        <Typography variant="h5" className={classes.typography}>
          Suggestions
        </Typography>
      </div>
      <div className={classes.allSuggestions}>
        <List>
                <Paper className={classes.suggestionPaper} elevation = {2}>
                  <ListItem>
                    <ListItemText
                      primary={sug0}
                      />
                    </ListItem>
                </Paper>
                <Paper className={classes.suggestionPaper} elevation = {2}>
                    <ListItem>
                      <ListItemText
                        primary={sug1}
                      />
                      </ListItem>
                </Paper>
        </List>
      </div>

        <div>

        <Button onClick={handleModal}>Send Email</Button>
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
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>

          </Paper>
        </Modal>
      </div>


    </div>
  )
};

export default withStyles(classes)(Suggestions);
