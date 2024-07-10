const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.error('No Authorization header');
    return res.status(401).send('Access denied. No token provided.');
  }

  console.log('Authorization Header:', authHeader);
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  if (!token) {
    console.error('Token missing in Authorization header');
    return res.status(401).send('Access denied. Token missing.');
  }
  
  console.log('Extracted Token:', token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log('AUTH.JS',req.user)
    next();
  } catch (ex) {
    console.error('Invalid token:', ex);
    res.status(400).send('Invalid token.');
  }
};

module.exports = authMiddleware;

