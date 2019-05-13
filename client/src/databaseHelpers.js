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

const getAllTickets = () => {
  const database = firebase.database();
  const dbref = database.ref('/');
  dbref.once('value', (snapshot) => {
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

const convertHTML = (html) => {
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  // Retrieve the text property of the element (cross-browser support)
  return tempDiv.textContent || tempDiv.innerText || "";
  // let htmlString = "<div><h1>Hello World</h1>\n<p>It's me, Mario</p></div>";
  // let output = convertHTML(htmlString);
  //Hello World
  //It's me, Mario
  // console.log(output);
}




export { getTicket, getAllTickets, getCategory, getMessage, getResponse, getNetID, getName, getTextBlocks };