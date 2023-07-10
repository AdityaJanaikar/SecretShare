
  // Import the functions you need from the SDKs you need
  //import firebase from 'firebase/app';
  //import 'firebase/database';
  const firebase = require('firebase/app');
  require('firebase/database');
  //const { getFirestore,collection,add } = require('firebase/firestore');
  const {getDatabase,ref, set, push } = require('firebase/database'); 

  //Done as this is not in a script but is an independent node.js file
  const express = require('express');

  //import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  //import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  //import axios from 

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  //const axios = require('axios');
  const app = express(); //Node.js REST API framework
  const PORT = 3000; //HTTP port
  const firebaseConfig = {
    apiKey: "AIzaSyCIcEboCwb1Q3S6cAdAq-rEizoOq_qPIGY",
    authDomain: "dummy-1f1d3.firebaseapp.com",
    projectId: "dummy-1f1d3",
    storageBucket: "dummy-1f1d3.appspot.com",
    messagingSenderId: "663031338263",
    appId: "1:663031338263:web:88b7937b31af082f175352",
    measurementId: "G-XQ11Y6LGGW"
  };

  //These are the details of a dummy Firebase database. The one in the project will be different

  // Initialize Firebase
    const fireapp =firebase.initializeApp(firebaseConfig);
    //const database = getFirestore(fireapp);//Cloud firestore
    const database = getDatabase(fireapp);//Real-time Database
  //const analytics = getAnalytics(app);
  


// async function fetcher(){
//   try{
//     const response = await fetch('https://api.example.com/tweets}');
//     if (!response.ok) {
//       throw new Error('Request failed with status: ' + response.status);
//     }
//     const data = await response.json();
//     // Do something with the data
//     console.log('Data from API:', data);

//     // Save the data to Firebase
//     const firebaseRef = firebase.database().ref('data');
//     await firebaseRef.set(data);
//     console.log('Data saved to Firebase successfully!');
//     } 
//     catch (error) {
//       console.error('Error fetching data from API:', error);
//     }
//   }

  /*The fetcher function is used to fetch data from the given URL. Obviously, no data can be fetched through the URL as
  of now as it doesn't exist */  

  //fetcher();

  //api post method
  app.post('/api/users', (request, response) => {
    const uData = request.body;
  
    try {
      const usersRef = push(ref(database, 'users'));
      set(usersRef, uData);
      response.json({ message: 'User data saved' });
    } catch (error) {
      response.status(500).json({ error: 'Failed to save user data' });
    }
  });
  

  // app.post('/api/users', async (request, response) => {
  //   const uData = request.body;
  
  //   try {
  //     const usersCollection = collection(database, 'users');
  //     const newURef = await add(usersCollection, uData);
  //     response.json({ message: 'User data saved' });
  //   } catch (error) {
  //     response.status(500).json({ error: 'Failed to save user data' });
  //   }
  // });

  
//api get all
  app.get('/api/users', (request, response) => {
    // Retrieve all users from Firebase
    database.ref('users').once('value')
      .then(snapshot => {
        const users = snapshot.val();
        response.json(users);
      })
      .catch(error => {
        response.status(500).json({ error: 'Failed to retrieve users from Firebase' });
      });
  });
  
  //api get specific user ID
  app.get('/api/users/:userId', (request, response) => {
    const userId = request.params.userId;
  
    // Retrieve a specific user from Firebase
    database.ref(`users/${userId}`).once('value')
      .then(snapshot => {
        const user = snapshot.val();
        if (user) {
          response.json(user);
        } else {
          response.status(404).json({ error: 'User not found' });
        }
      })
      .catch(error => {
        response.status(500).json({ error: 'Failed to retrieve user from Firebase' });
      });
  });

  app.listen(PORT, () => {
    
    console.log(`Server is running on port ${PORT}.`);
  });

  /* The goal of this file was just to write an error free back-end node.js code*/

  /*const express = require('express');
const firebase = require('firebase/app');
require('firebase/database');

const app = express();
const port = 3000;

// Firebase configuration
const firebaseConfig = {
  apiKey: '<YOUR_API_KEY>',
  authDomain: '<YOUR_AUTH_DOMAIN>',
  databaseURL: '<YOUR_DATABASE_URL>',
  projectId: '<YOUR_PROJECT_ID>',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = firebase.database();

// Define API endpoint to get all users from Firebase
a

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/
// const express = require("express");
// const cors = require("cors");
// const app = express();
// //const firebase = require("firebase");

// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));
// // parse requests of content-type - application/json
// app.use(express.json());
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));
// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to dbestech nodejs flutter application." });
// });
// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// const {tweets} = require('./tweets');
// app.get('/tweets',tweets);
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

