import React, { useState, useEffect } from 'react';
import { withStyles, List, ListItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Fab from '@material-ui/core/Fab';
import { firebase } from '../firebaseConfig';
import Paper from '@material-ui/core/Paper';
import UserTypes from '../enums/UserTypes';
import { makeStyles } from '@material-ui/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';



const classes = {
    titleDiv: {
      display: 'block',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      marginTop: '10px',
      marginLeft: 'Auto',
      marginRight: 'Auto',

    },
    theirMessage: {
        marginBottom: '4px',
        width: '60%',
        float: 'left',
        borderRadius: '5px 30px 30px',
        border: '1.5px #adadad',
        borderStyle: 'solid',
        margin: '10px',
        backgroundColor: 'rgb(221, 221, 221)',
        boxShadow: '3px 3px 10px #adadad'
    },
    yourMessage: {
        display: 'inline',
        marginBottom: '4px',
        width: '60%',
        float: 'right',
        textAlign: 'right',
        borderRadius: '30px 30px 5px',
        border: '1.5px #adadad',
        borderStyle: 'solid',
        margin: '10px',
        backgroundColor: 'rgba(161,219,255,1)',
        boxShadow: '3px 3px 10px #adadad'
    },
    chatWrapper: {
        float: 'right',

    },
    upperDiv: {

      border: '1px solid red',

    },
    flexDiv: {


     },
     input: {


       width: '94%',
       border: '1px solid gray',
       borderRadius: '4px',
       paddingLeft: '10px',


     },
     iconButton: {
       padding: 10,

     },


  };


  const classesMS = makeStyles(classes);

// Volunteezy ClassChat

const ChatPane = ({userType: currentUserType, styleClass, ticket, match, quarter, exercise}) =>
{
    const [messageList,setMessageList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const getMessages = () =>
    {

        const messagesRef = database.ref(quarter + '/' + exercise + '/tickets/' +  match.params.id + '/userMessages/');
        messagesRef.on('value',(snapshot) =>
        {
            let messageObjects = []
            const msgs = snapshot.val();
            if(msgs == null)
            {
                return;
            }
            const messageKeys = Object.keys(msgs);
            console.log(messageKeys);
            console.log(msgs);
            messageKeys.map((key) => {
                console.log(msgs[key])
                messageObjects.push(msgs[key]);
            });
            console.log(messageObjects);
            setMessageList(messageObjects);
        })

    }

    const renderUser = (userType) =>
    {
        console.log("called");
        switch(userType)
        {
            case UserTypes.STUDENT:
                return "Student"
            case UserTypes.MENTOR:
                return "Mentor";
        }
    }

    useEffect(() =>
    {
        getMessages();
    },[ticket,currentMessage])
    let database = firebase.database();
    const sendMessage = (message) =>
    {
        setCurrentMessage("");
        const messagesRef = database.ref(quarter + '/' + exercise + '/tickets/' +  match.params.id + '/userMessages/');

        console.log(messagesRef);
        messagesRef.push({userType:currentUserType,message:message});
        messagesRef.on('value', (snapshot) =>
        {
            const db = snapshot.val();
            console.log(db);
        });
        console.log(message);

    }
    const updateCurrentMessage = (event) =>
    {
        setCurrentMessage(event.target.value);
        console.log(currentMessage);
        console.log(styleClass);
    }
    const getMessageStyle = (message) =>
    {
        return (
            message.userType == currentUserType ?
                classes.yourMessage :
                classes.theirMessage
            )
    }
    return (
        <div style={classes.titleDiv}>
            <Typography variant="h5">
                Chat
            </Typography>
            <List>
              <Paper>
                {messageList && messageList.map(message => <ListItem style={
                    getMessageStyle(message)}>
                    <div style= {classes.chatWrapper}>
                        <Typography variant="p"><i>{renderUser(message.userType)}</i></Typography>
                        <p>{message.message }</p>
                    </div>
                </ListItem>
                )}




                <InputBase
                  id="inputMessage"
                  margin="normal"
                  multiline
                  rows={1}
                  fullWidth={true}
                  style={classes.input}
                  placeholder="Send a Message"
                  onChange = {updateCurrentMessage}
                  InputLabelProps={{
                      shrink: true,
                  }}
                />

                <IconButton style={classes.iconButton} aria-label="Search" onClick={() => sendMessage(currentMessage)}>
                  <SendIcon />
                </IconButton>





                </Paper>
            </List>
        </div>
    )
}

export default ChatPane;
