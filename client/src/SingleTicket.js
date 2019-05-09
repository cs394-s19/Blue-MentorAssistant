import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Info from './Info';


//css need to be in camel case format
const classes = {

};

const SingleTicket = ( {classes} ) => {

  return (
    <div>
      <Info classes = {classes} />
    </div>
  );
};

export default withStyles(classes)(SingleTicket);
