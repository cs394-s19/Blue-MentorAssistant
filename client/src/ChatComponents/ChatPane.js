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


// Volunteezy ClassChat

const ChatPane = ({userType, ticket}) =>
{
    const messages = useState[messageList,setMessageList];

    const getMessages = () =>
    {
        setMessageList(ticket.messages); 
    }

    useEffect(() =>
    {
        getMessages();
    },[ticket])
    let database = firebase.database();
    const sendMessage = (userType, message) =>
    {
        database.ref('winter2019/exercise1/tickets' + match.params.id + '/')
    }
    return (
        <div>
            <List>
                <ListItem>
                    <p>'Stuff!'</p>
                </ListItem>
                {messages.map(message => <ListItem>
                    <p>{message}</p>
                </ListItem>)};
            </List>
        </div>
    )
}