import { firebase } from './firebaseConfig';

const getAllTickets = () => {
  const database = firebase.database();
  const dbref = database.ref('/');
  dbref.once('value', (snapshot) => {
    console.log(snapshot.val());
    return snapshot.val();
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




export { getAllTickets };