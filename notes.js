const chalk = require('chalk')
const fs = require('fs')
const { title } = require('process')


const addNote = (title, body) => {
    const notes = loadNotes()

    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (duplicateNote === undefined) {
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.bgGreen('New Note saved!!!'))
    } else {
        console.log(chalk.bgRed('Note title already exists!!! \nPlease try another title. '))
    }

    saveNotes(notes)
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const JSONdata = dataBuffer.toString()
        return JSON.parse(JSONdata)
    } catch (e) {
        return []
    }
}


const removeNotes = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length === notesToKeep.length) {
        console.log(chalk.bgRed('Failed to remove Note!!! \nPlease provide correct title.'))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen('Note Removed!!!'))
    }
}


const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your Notes \n\n'))

    notes.forEach((note) => {
        console.log(chalk.bgBlue('title------>'), note.title)
        console.log(chalk.bgRed('body------->'), note.body, '\n')
    });
}


const readNotes = (title) => {
    const notes = loadNotes()

    const requiredNote = notes.find((note) => note.title === title)

    if (requiredNote) {
        console.log(chalk.bgGreen(title))
        console.log(requiredNote.body)
    } else {
        console.log(chalk.bgRed('Failed to read Note!!! \nPlease provide correct title.'))
    }

}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}