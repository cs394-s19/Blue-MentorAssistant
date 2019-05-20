import { firebase } from './firebaseConfig';

const getAllTickets = () => {
  const database = firebase.database();
  const dbref = database.ref('/');
  dbref.on('value', (snapshot) => {
    console.log(snapshot.val());
    return snapshot.val();
  });
}

export { getAllTickets };