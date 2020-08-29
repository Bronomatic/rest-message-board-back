const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // * Check if 'Authorization' header exists.
  const authHeader = req.get('Authorization');
  if(!authHeader){
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  // * Separate the token from the header.
  const token = authHeader.split(' ')[1];

  // * Decode the token.
  let decodedToken;
  try{
    decodedToken = jwt.verify(token, 'ThisIsASecretSoDoNotTellAnyone');
  }catch(err){
    err.statusCode = 500;
    throw err;
  }

  // * If token is invalid.
  if(!decodedToken){
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  // * If token is valid, get 'userId' from it.
  req.userId = decodedToken.userId;
  // * Continue to route.
  next();
};