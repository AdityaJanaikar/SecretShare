const express = require('express');
const admin = require('firebase-admin');
const database = require('firebase/database')
//const database = require('firebase/firestore')
 
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://shris-data-default-rtdb.asia-southeast1.firebasedatabase.app',
  //project-id
  "project_id": "shris-data",
});
 
// Create an Express app
const app = express();
app.use(express.json());
 
// Endpoint to save data to Cloud Firestore
app.post('/data', (req, res) => {
  const data = req.body;
 
  // Validate the incoming data
  if (!data || !data.documentName || !data.sender || !data.recipient || !data.sender.atSign || !data.recipient.atSign) {
    return res.status(400).send('Invalid data');
  }
 
  // Save the document data to Cloud Firestore
  admin.firestore().collection('documents').add(data)
    .then(docRef => {
      res.send(`Document saved successfully with ID: ${docRef.id}`);
    })
    .catch(error => {
      console.error('Error saving document:', error);
      res.status(500).send('Error saving document');
    });
});
 
// Method to add TransactionID to the data
function addTransactionID(data, transactionID) {
  // Add the transactionID to the data object
  data.transactionID = transactionID;
  return data;
}
 
// Endpoint to add TransactionID to the saved data
app.put('/data/:documentId', (req, res) => {
  const documentId = req.params.documentId;
  const transactionID = req.body.transactionID;
 
  // Retrieve the document data from Cloud Firestore
  admin.firestore().collection('documents').doc(documentId).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        const updatedData = addTransactionID(data, transactionID);
        // Update the document data with the added TransactionID
        admin.firestore().collection('documents').doc(documentId).set(updatedData)
          .then(() => {
            res.send('TransactionID added successfully');
          })
          .catch(error => {
            console.error('Error adding TransactionID:', error);
            res.status(500).send('Error adding TransactionID');
          });
      } else {
        res.status(404).send('Document not found');
      }
    })
    .catch(error => {
      console.error('Error retrieving document:', error);
      res.status(500).send('Error retrieving document');
    });
});
 
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



// const express = require('express');
// const firebase = require('firebase/compat/app');
// require('firebase/database');

// const app = express();
// const PORT = 3000;
// const firebaseConfig = {
//     apiKey: "AIzaSyCIcEboCwb1Q3S6cAdAq-rEizoOq_qPIGY",
//     authDomain: "dummy-1f1d3.firebaseapp.com",
//     projectId: "dummy-1f1d3",
//     storageBucket: "dummy-1f1d3.appspot.com",
//     messagingSenderId: "663031338263",
//     appId: "1:663031338263:web:88b7937b31af082f175352",
//     measurementId: "G-XQ11Y6LGGW"
//   };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const database = firebase.database();

// // api post method
// app.post('/api/users', (request, response) => {
//   const uData = request.body;
//   const newUref = database.ref('users').push();
//   newUref.set(uData);
//   response.json({ message: 'User data saved' });
// });

// // api get all
// app.get('/api/users', (request, response) => {
//   // Retrieve all users from Firebase
//   database.ref('users').once('value')
//     .then(snapshot => {
//       const users = snapshot.val();
//       response.json(users);
//     })
//     .catch(error => {
//       response.status(500).json({ error: 'Failed to retrieve users from Firebase' });
//     });
// });

// // api get specific user ID
// app.get('/api/users/:userId', (request, response) => {
//   const userId = request.params.userId;


//   database.ref(`users/${userId}`).once('value')
//     .then(snapshot => {
//       const user = snapshot.val();
//       if (user) {
//         response.json(user);
//       } else {
//         response.status(404).json({ error: 'User not found' });
//       }
//     })
//     .catch(error => {
//       response.status(500).json({ error: 'Failed to retrieve user from Firebase' });
//     });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
