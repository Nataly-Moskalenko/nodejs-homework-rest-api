const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { User } = require('../../models/user');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  const image = await Jimp.read(req.file.path);
  await image.resize(250, 250);
  await image.writeAsync(req.file.path);

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
  res.json({ avatarURL });
};

module.exports = updateAvatar;
