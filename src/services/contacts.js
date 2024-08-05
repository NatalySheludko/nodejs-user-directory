import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  contactsQuery.where('userId').equals(userId);

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (contactId, userId) => {
  return ContactsCollection.findOne({ _id: contactId, userId });
};

export const createContact = (contact) => {
  return ContactsCollection.create(contact);
};

export const deleteContact = (contactId, userId) => {
  return ContactsCollection.findOneAndDelete({ _id: contactId, userId });
};

export const updateContact = (contactId, contact, userId) => {
  return ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    contact,
    {
      new: true,
      upsert: true,
    },
  );
};

export const patchContact = (contactId, contact, userId) => {
  return ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    contact,
    {
      new: true,
    },
  );
};
