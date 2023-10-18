const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json"); 


function listContacts() {

  const contactsData = fs.readFileSync(contactsPath, "utf-8");
  const contacts = JSON.parse(contactsData);

  console.table(contacts);
}

function getContactById(id) {

  const contactsData = fs.readFileSync(contactsPath, "utf-8");
  const contacts = JSON.parse(contactsData);

  const contact = contacts.find((c) => c.id === id);
  if (contact) {
    console.table([contact]);
  } else {
    console.log("Contact not found.");
  }
}

function addContact(name, email, phone) {

  const contactsData = fs.readFileSync(contactsPath, "utf-8");
  const contacts = JSON.parse(contactsData);

  const newContact = {
    id: generateContactId(contacts),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));

  console.log("Contact added successfully.");
}

function removeContact(id) {

  const contactsData = fs.readFileSync(contactsPath, "utf-8");
  const contacts = JSON.parse(contactsData);

  const index = contacts.findIndex((c) => c.id === id);
  if (index !== -1) {
    contacts.splice(index, 1);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact removed successfully.");
  } else {
    console.log("Contact not found.");
  }
}

function generateContactId(contacts) {
    if (contacts.length === 0) {
      return "1"; 
    }
    
   
    const highestId = contacts.reduce((highest, contact) => {
      const contactId = parseInt(contact.id);
      return contactId > highest ? contactId : highest;
    }, 0);

    return (highestId + 1).toString();
  }

module.exports = { listContacts, getContactById, addContact, removeContact };


