//This is done to export the google admin credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'D:\\Coding practice\\AppD\\conftwitter\\adminsdk.json';

const express = require('express');
const admin = require('firebase-admin');
const cors= require('cors');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://shris-data-default-rtdb.asia-southeast1.firebasedatabase.app',
  project_id: 'shris-data'
});

// Create an Express app
const app = express();
app.use(express.json());
app.use(cors());


//CORS middleware

const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.options('*', cors(corsOptions));


// Endpoint to save data to Cloud Firestore
app.post('/data', (req, res) => {
  const data = req.body;

  // Validate the incoming data
  if (!data || !data.sender || !data.recipient || !data.sender.atSign || !data.recipient.atSign) {
    return res.status(400).send('Invalid data');
  }

  // Save the document data to Cloud Firestore
  const collection = admin.firestore().collection('confessions'); // Change this to the desired collection name
  collection
    .add(data)
    .then((docRef) => {
      res.send(`Document saved successfully with ID: ${docRef.id}`);
    })
    .catch((error) => {
      console.error('Error saving document:', error);
      res.status(500).send('Error saving document');
    });
});

// Start the server
const ip = '0.0.0.0' ;
const port = 3000;
app.listen(port, ip , () => {
  console.log(`Server is running on port http://${ip}:${port}`);
});
