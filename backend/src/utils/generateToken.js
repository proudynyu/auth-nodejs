const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret = process.env.SECRET;

const token = (user_id) => {
    return jwt.sign( { id: user_id },  secret, {
        expiresIn: 86400,
    });
}

module.exports = token;