import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TicketHeader from './InfoComponents/TicketHeader';
import StudentInfo from './InfoComponents/StudentInfo';
import TicketInfo from './InfoComponents/TicketInfo';

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



const Info = ({classes, ticket, exercise}) => {

  return (
    <div>
        <TicketHeader exerciseProp={exercise} classes ={classes} ticket={ticket} />
        <StudentInfo classes={classes} ticket={ticket} />
        <TicketInfo classes={classes} ticket={ticket}/>
    </div>

  )


};

export default withStyles(classes)(Info);
