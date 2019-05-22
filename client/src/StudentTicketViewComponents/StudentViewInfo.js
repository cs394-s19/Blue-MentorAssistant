import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TicketHeader from '../SingleTicketComponents/InfoComponents/TicketHeader';
import TicketInfo from '../SingleTicketComponents/InfoComponents/TicketInfo';
import UserTypes from '../enums/UserTypes.js';
import MentorResponse from './MentorResponse.js';
const classes = {
  titleDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: '10px',
    marginLeft: 'Auto',
    marginRight: 'Auto',

  },

  statusDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',

    marginLeft: 'Auto',
    marginRight: 'Auto',
  },
  titleField: {
    display: 'flex',
    width: '100%',

    // backgroundColor: '#FFFFFF',
  },
  codeField: {
    display: 'flex',
    width: '100%',
  },
  statusField: {
    display: 'flex',

    width: '48%',

  },
  formControl: {
    display: 'flex',
    marginTop: '6px',
    width: '48%',

  },
};

const StudentViewInfo = ({classes, ticket}) =>
{
    return (
        <div>
            <TicketHeader classes = {classes} ticket= {ticket} />           
            <TicketInfo classes = {classes} ticket={ticket}/>
            <MentorResponse classes = {classes} ticket = {ticket} />
        </div>
    )
}

export default withStyles(classes)(StudentViewInfo);