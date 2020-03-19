// const chalk = require('chalk');
// var validator = require('validator');
const yargs = require('yargs');
const notes = require('./notes.js');

// Add
yargs.command({
    command: 'add',
    describe: 'adds a new note',
    builder: {
        title: {
            describe:'Note title',
            demandOption: true,
            type: 'string',
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {  
        notes.addNote(argv.title, argv.body);
    }
});

// Delete
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {  
        notes.removeNote(argv.title);
    }
});

// Listing
yargs.command({
    command: 'list',
    describe: 'list notes',
    handler() {  
        notes.getNotes();
    }
});

// Reading
yargs.command({
    command: 'read',
    describe: 'read notes',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {  
        notes.readNote(argv.title);
    }
});

yargs.parse();