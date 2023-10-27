const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid'); 
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);
    console.table(contacts);
  } catch (error) {
    console.error("Error listing contacts: " + error);
  }
}

async function getContactById(id) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);

    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      console.table([contact]);
    } else {
      console.log("Contact not found.");
    }
  } catch (error) {
    console.error("Error getting contact by ID: " + error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);

    const newContact = {
      id: uuidv4(), 
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    console.log("Contact added successfully.");
  } catch (error) {
    console.error("Error adding contact: " + error);
  }
}

async function removeContact(id) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);

    const index = contacts.findIndex((c) => c.id === id);
    if (index !== -1) {
      contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      console.log("Contact removed successfully.");
    } else {
      console.log("Contact not found.");
    }
  } catch (error) {
    console.error("Error removing contact: " + error);
  }
}

module.exports = { listContacts, getContactById, addContact, removeContact };
