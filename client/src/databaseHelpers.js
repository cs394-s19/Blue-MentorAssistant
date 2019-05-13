import { firebase } from './firebaseConfig';


const getTicket = (ticket) => {
  console.log(ticket);
  const database = firebase.database();
  const ticketRef = database.ref(ticket);
  ticketRef.once('value', (snapshot) => {
    console.log(snapshot.val());
    return snapshot.val();
  });
}

const getCategory = (ticket) => {
  const database = firebase.database();
  const ticketRef = database.ref(ticket);
  ticketRef.once('value', (snapshot) => {
    return snapshot.val()['category'];
  });
}

const getMessage = (ticket) => {
  const database = firebase.database();
  const ticketRef = database.ref(ticket);
  ticketRef.once('value', (snapshot) => {
    return snapshot.val()['message'];
  });
}

const getResponse = (ticket) => {
  const database = firebase.database();
  const ticketRef = database.ref(ticket);
  ticketRef.once('value', (snapshot) => {
    return snapshot.val()['response'];
  });
}

const getNetID = (ticket) => {
  const database = firebase.database();
  const ticketRef = database.ref(ticket + "/student");
  ticketRef.once('value', (snapshot) => {
    return snapshot.val()['id'];
  });
}

const getName = (ticket) => {
  const database = firebase.database();
  const ticketRef = database.ref(ticket + "/student");
  ticketRef.once('value', (snapshot) => {
    return snapshot.val()['name'];
  });
}

const getTextBlocks = (ticket) => {
  const database = firebase.database();
  const ticketRef = database.ref(ticket + "/student");
  ticketRef.once('value', (snapshot) => {
    return snapshot.val()['textBlocks'];
  });
}





export { getTicket, getCategory, getMessage, getResponse, getNetID, getName, getTextBlocks };