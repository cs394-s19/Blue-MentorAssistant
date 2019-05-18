import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import SingleTicket from './SingleTicket';
import QueueView from './QueueView';
import NewTicket from './NewTicketComponents/NewTicket';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

//ROUTES
//'/ticket/:id' - Single Ticket - Where a TA can see one ticket 
//'/queue/' - Queue View - Home for the TAs to see all/open tickets
//'/' - Home - A Landing page for both Students and TAs
//'/newticket/' - New Ticket - Where students add their ticket

const routing = (
  <Router>
    <div>
      <Route path="/ticket/:id" component={SingleTicket} />
      <Route path="/queue/" component={QueueView} />
      <Route exact path="/" component={Home} />
      <Route exact path="/newticket/" component={NewTicket} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))