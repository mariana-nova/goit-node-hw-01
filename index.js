const yargs = require('yargs');
const contacts = require('./contacts'); 

const argv = yargs
  .command('list', 'List all contacts')
  .command('get', 'Get a contact by ID', {
    id: {
      describe: 'Contact ID',
      demand: true,
      alias: 'i'
    }
  })
  .command('add', 'Add a new contact', {
    name: {
      describe: 'Contact name',
      demand: true,
      alias: 'n'
    },
    email: {
      describe: 'Contact email',
      demand: true,
      alias: 'e'
    },
    phone: {
      describe: 'Contact phone number',
      demand: true,
      alias: 'p'
    }
  })
  .command('remove', 'Remove a contact by ID', {
    id: {
      describe: 'Contact ID',
      demand: true,
      alias: 'i'
    }
  })
  .help()
  .argv;

  function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case 'list':
        
        contacts.listContacts();
        break;
  
      case 'get':
       
        contacts.getContactById(id);
        break;
  
      case 'add':
       
        contacts.addContact(name, email, phone);
        break;
  
      case 'remove':
   
        contacts.removeContact(id);
        break;
  
      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  }
  

  invokeAction(argv);
  