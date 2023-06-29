const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

const { User } = require('../../models/user');

const { HttpError } = require('../../helpers');

// dotenv.config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, 'Email or password invalid');
  }

  const payload = { id: user.id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  // const decodeToken = jwt.decode(token);

  // try {
  //   const { id } = jwt.verify(token, SECRET_KEY);
  //   console.log(id);
  // } catch (error) {
  //   console.log(error.message);
  // }

  res.json({ token });
};

module.exports = login;
