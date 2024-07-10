const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')

// Example protected route
router.get('/', authMiddleware, (req, res) => {
  // Access authenticated user information
  const user = req.user;
  
  return res.json(user);
});

module.exports = router;
