const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green.inverse('Your notes title:'));
    notes.forEach(note => {
        console.log(note.title);
    });

};

const addNote = (title, body) => {

    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {

        notes.push({
            title: title,
            body: body
        });
        console.log('successfully added a note');

    } else {

        console.log('title already taken...!!');

    }

    saveNote(notes);

};

const removeNote = (title) => {

    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notesToKeep.length !== notes.length) {

        saveNote(notesToKeep);
        console.log(chalk.green.inverse('successfully removed the note'));

    } else {

        console.log(chalk.red.inverse('title not found..!!'));

    }
    console.log(loadNotes());


};

const readNote = (title) => {

    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.title === title);

    if (noteToRead) {

        console.log(chalk.bold.blue('Title: ') + chalk.italic.green(noteToRead.title));
        console.log(chalk.bold.blue('Body: ') + chalk.italic.green(noteToRead.body));

    } else {
        console.log(chalk.red.bold('Note Not Found'));
        
    }

}

const saveNote = (notes) => {

    dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);

};

const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }

};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
};