const { Contact } = require('../../models/contact');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  // const { page = 1, limit = 20 } = req.guery;
  // const skip = (page - 1) * limit;
  // const allContacts = await Contact.find({ owner }, '-createdAt -updatedAt', {
  //   skip,
  //   limit,
  // }).populate('owner', 'email');
  const allContacts = await Contact.find({ owner }, '-createdAt -updatedAt').populate(
    'owner',
    'email'
  );
  res.json(allContacts);
};

module.exports = listContacts;
