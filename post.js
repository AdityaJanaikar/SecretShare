const fetch = require('node-fetch');

// POST request example
const url = 'http://localhost:3000/data';
const data = {
  documentName: 'something.word',
  sender: {
    atSign: '@Abc'
  },
  recipient: {
    atSign: '@Def'
  }
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.error(error));
