# Mentor Assistant

## Starting The Application
Clone the repository. From the root directory, `cd client` then  `npm install` then `npm start`. This will launch the application in the browser, on http://localhost:3000

## Login NetIDs for Testing
Currently, the NetIDs for the class is saved in the attached Firebase as a Roster dictionary. For testing, one may use the following login NetIDs:
```
3 student netIDs:
aaa0000
bbb0000
student

3 mentor netIDs:
ccc0000
ddd0000
mentor
```

## File Structure
The application is split into 2 parts, the student side and the mentor side.

## Student

### NewTicketComponents
* NewTicket.js - The form to let students submit tickets. Comprised of:
  * TextBlocks.js - Where the API gets most of it's information. Students can submit their code input and output in "textBlocks"
  * TicketForm.js - The rest of the information, including the student's NetID, email, name, etc.
  
### StudentTicketViewComponents
* StudentViewInfo.js - After the student submits the form, they're redirected to this screen, which has the info they just submitted. It also has a chat window for back and forth communication between mentors and the student.
  * MentorResponse.js - the chat window
  

## Mentor

### SingleTicketComponents
* SingleTicketView.js - The wrapper for the the ticket view the mentors see after opening a ticket from the queue. Contains:
  * InfoComponents:
    * StudentInfo.js - Student's name, email, NetID
    * TicketHeader.js - Other information, like date submitted, exercise, and title
    * TicketInfo.js - contains the textBlocks (student's input and output)
    * Info.js - a wrapper for all the above Info Components
    
  * Footer.js - a wrapper for the following components:
    * Suggestions.js - suggestions the API generated from the student's ticket
  
  * InternalNotes.js - contains notes that the mentors can leave each other per exercise.
  
  * ChatPane.js - the chat window for mentor/student communication
  
### QueueView
* QueueView.js - lists all the current tickets in the database. Clicking on one opens up the SingleTicketView for that ticket. Right now, all tickets route to Winter2019. A future TODO would be having a way for an instructor to setup a new class.
  
