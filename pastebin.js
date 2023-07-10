const express = require('express');
const admin = require('firebase-admin');
 
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://console.firebase.google.com/project/shris-data/database/shris-data-default-rtdb/data/~2F'
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