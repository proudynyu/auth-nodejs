const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret = process.env.SECRET;

module.exports = {
    validToken(req, res, next) {
        const auth = req.headers.authorization;

        if (!auth)
            return res.status(400).json({ error: 'Not Authorized' });

        const [ bearer, token ] = auth.split(' ');
        
        if(!/^Bearer$/i.test(bearer))
            return res.status(400).json({ error: 'Not Bearer' });

        jwt.verify(token, secret, (err, decoded) => {
            if (err)
                return res.statur(400).json({ error: 'Token not valid' });
            
            req.id = decoded.id;
            return next();
        });
    },
}