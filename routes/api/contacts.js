const express = require('express');

const ctrl = require('../../controllers/contacts');

const { ctrlWrapper } = require('../../helpers');

const { validateBody, isValidId } = require('../../middlewares');

const { schema } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', validateBody(schema.addSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  '/:contactId',
  isValidId,
  validateBody(schema.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schema.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
