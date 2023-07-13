const register = require('./register');

const verifyEmail = require('./verifyEmail');

const resendVerifyEmail = require('./resendVerifyEmail');

const login = require('./login');

const getCurrent = require('./getCurrent');

const logout = require('./logout');

const updateSubscriptionUser = require('./updateSubscriptionUser');

const updateAvatar = require('./updateAvatar');

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscriptionUser,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
