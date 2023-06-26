const Contact = require('../models/contact');

const { HttpError, ctrlWrapper } = require('../helpers');

const listContacts = async (req, res) => {
  const allContacts = await Contact.find();
  res.json(allContacts);
};

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const contactById = await Contact.findOne({ id });
  if (!contactById) {
    throw HttpError(404, 'Not found');
  }
  res.json(contactById);
};

const addContact = async (req, res) => {  
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const removingContact = await Contact.findOneAndRemove({ id });
  if (!removingContact) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'Contact deleted' });
};

// const updateContact = async (req, res) => {
//   const id = req.params.contactId;
//   const updatingContact = await contacts.updateContact(id, req.body);
//   if (!updatingContact) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(updatingContact);
// };

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  // updateContact: ctrlWrapper(updateContact),
};
