const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  token = token.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user id, role, etc.
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token failed' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ message: 'Admin access only' });
  }
};
