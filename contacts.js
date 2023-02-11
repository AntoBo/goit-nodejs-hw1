const fs = require("fs").promises;
const path = require("path");

const contactsPath = "./db/contacts.json";

// list all contacts
async function listContacts() {
    try {
        const readData = await fs.readFile(path.resolve(contactsPath), "utf-8");
        const data = JSON.parse(readData);

        console.table(data);
    } catch (error) {
        console.error(error);
    }
}

//get contact by ID
async function getContactById(contactId) {
    try {
        const readData = await fs.readFile(path.resolve(contactsPath), "utf-8");
        const data = JSON.parse(readData);

        const contact = data.find((el) => el.id == contactId);
        if (contact) {
            console.table(contact);
        } else {
            console.error(`Contact with id ${contactId} wasnt found`);
        }
    } catch (error) {
        console.error(error);
    }
}

// getContactById(65);
async function removeContact(contactId) {
    try {
        const readData = await fs.readFile(path.resolve(contactsPath), "utf-8");
        const data = JSON.parse(readData);
        const newData = data.filter((el) => el.id != contactId);

        await fs.writeFile(path.resolve(contactsPath), JSON.stringify(newData), "utf-8");
        console.log(`Contact with ID ${contactId} removed`);
    } catch (error) {
        console.error(error);
    }
}

//adding new contact
async function addContact(name, email, phone) {
    try {
        const readData = await fs.readFile(path.resolve(contactsPath), "utf-8");
        const data = JSON.parse(readData);
        const id = (data.length + 1).toString();
        const newContact = { id, name, email, phone };

        data.push(newContact);

        await fs.writeFile(path.resolve(contactsPath), JSON.stringify(data), "utf-8");
        console.log(`Contact with ID ${id} added`);
        console.table(newContact);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
