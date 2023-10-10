const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
    fs.readFile(contactsPath, 'utf8', (error, data) => {
      if (error) {
        console.error('Error reading contacts:', error);
        return;
      }
      const contacts = JSON.parse(data);
      console.table(contacts);
    });
  }
  
  function getContactById() {

  }

  function removeContact () {

  }

  function addContact (){

  }
 

