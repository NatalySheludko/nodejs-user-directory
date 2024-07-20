import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = () => {
  return ContactsCollection.find();
};

export const getContactById = (contactId) => {
  return ContactsCollection.findById(contactId);
};

export const createContact = (contact) => {
  return ContactsCollection.create(contact);
};

export const deleteContact = (contactId) => {
  return ContactsCollection.findByIdAndDelete(contactId);
};

export const updateContact = (contactId, contact) => {
  return ContactsCollection.findByIdAndUpdate(contactId, contact, {
    new: true,
    upsert: true,
  });
};

export const patchContact = (contactId, contact) => {
  return ContactsCollection.findByIdAndUpdate(contactId, contact, {
    new: true,
  });
};
