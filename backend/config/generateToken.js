const jwt = require('jsonwebtoken')


const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: "7d",
    });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10d",
  });
};

module.exports = {generateToken, generateRefreshToken};