// utils/hashUtils.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, firstName: user.firstname, lastName: user.lastname },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};


const verifyToken = (token) => {
   console.log('BACKEND TOKEN'+JSON.stringify(token))
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken
};
