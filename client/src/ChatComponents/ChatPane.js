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

// Volunteezy ClassChat

const ChatPane = ({userType, ticket, match, quarter, exercise}) =>
{
    const [messageList,setMessageList] = useState(["111","2222"]);
    const [currentMessage, setCurrentMessage] = useState("");
    const getMessages = () =>
    {

        const messagesRef = database.ref('winter2019' + '/' + 'exercise1' + '/tickets/' +  match.params.id + '/userMessages/');
        messagesRef.on('value',(snapshot) =>
        {
            let messageStrings = []
            const msgs = snapshot.val();
            const messageKeys = Object.keys(msgs);
            console.log(messageKeys);
            console.log(msgs);
            messageKeys.map((key) => {
                messageStrings.push(msgs[key]);
            });
            setMessageList(messageStrings);
        })
         
    }

    useEffect(() =>
    {
        getMessages();
    },[ticket,currentMessage])
    let database = firebase.database();
    const sendMessage = (message) =>
    {
        const messagesRef = database.ref('winter2019' + '/' + 'exercise1' + '/tickets/' +  match.params.id + '/userMessages/');

        console.log(messagesRef);
        messagesRef.push(message);
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
                <Button onClick={() => sendMessage(currentMessage)}>
                    Submit
                </Button>
                </form>
                </Paper>
            </List>
        </div>
    )
}

export default ChatPane;