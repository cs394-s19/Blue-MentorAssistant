import React, { useState, useEffect } from 'react';
import { withStyles, List, ListItem } from '@material-ui/core';
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
import { firebase } from '../firebaseConfig';
import Paper from '@material-ui/core/Paper';
import UserTypes from '../enums/UserTypes';

// Volunteezy ClassChat

const ChatPane = ({userType, ticket, match, quarter, exercise}) =>
{
    const [messageList,setMessageList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const getMessages = () =>
    {

        const messagesRef = database.ref('winter2019' + '/' + 'exercise1' + '/tickets/' +  match.params.id + '/userMessages/');
        messagesRef.on('value',(snapshot) =>
        {
            let messageStrings = []
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
                messageStrings.push(renderUser(msgs[key]["userType"]) + " " + msgs[key]["message"]);
            });
            console.log(messageStrings);
            setMessageList(messageStrings);
        })
         
    }

    const renderUser = (userType) =>
    {
        console.log("called");
        switch(userType)
        {
            case UserTypes.STUDENT:
                return "Student:"
            case UserTypes.MENTOR:
                return "Mentor:";
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
        const messagesRef = database.ref('winter2019' + '/' + 'exercise1' + '/tickets/' +  match.params.id + '/userMessages/');

        console.log(messagesRef);
        messagesRef.push({userType:userType,message:message});
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
    }
    return (
        <div>
            <List>
                <ListItem>
                    <p>'Stuff!'</p>
                </ListItem>
                <Paper>
                {messageList && messageList.map(message => <ListItem>
                    <p>{message}</p>
                </ListItem>)}
                <form>
                <TextField
                    id="inputMessage"
                    margin="normal"
                    multiline
                    rows={3}
                    fullWidth={true}
                    onChange = {updateCurrentMessage}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}>
                </TextField>
                <Button size="Large"onClick={() => sendMessage(currentMessage)}>
                    Submit
                </Button>
                </form>
                </Paper>
            </List>
        </div>
    )
}

export default ChatPane;