//<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCIcEboCwb1Q3S6cAdAq-rEizoOq_qPIGY",
    authDomain: "dummy-1f1d3.firebaseapp.com",
    projectId: "dummy-1f1d3",
    storageBucket: "dummy-1f1d3.appspot.com",
    messagingSenderId: "663031338263",
    appId: "1:663031338263:web:88b7937b31af082f175352",
    measurementId: "G-XQ11Y6LGGW"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  async function fetcher(){
    try{
      const response = await fetch('');
      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }
      const data = await response.json();
      // Do something with the data
      console.log('Data from API:', data);
  
      // Save the data to Firebase
      const firebaseRef = firebase.database().ref('data');
      await firebaseRef.set(data);
      console.log('Data saved to Firebase successfully!');
      } 
      catch (error) {
        console.error('Error fetching data from API:', error);
      }
    }
  
    fetcher();
    
  module.exports = { firebase }; 
//</script>