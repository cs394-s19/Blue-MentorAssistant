import { firebase } from './firebaseConfig';
const getUserSuggestions = (ticket) => { 
  const userAction = async (key) => {
    const response = await fetch('https://secure-oasis-87770.herokuapp.com/api/form', {
        method: 'POST',
        body: JSON.stringify(ticket), // string or object
        headers:{
            'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log("myJson ====> ", myJson);
    // app.table_info[key]["responses"] = myJson['response'];
    // //console.log("info => ", app.table_info[key]["responses"]);

    // console.log("patterns string ====> ", myJson['patternsObj']);
    // app.table_info[key]["patterns"] = myJson['patternsObj'];
  }
}
  