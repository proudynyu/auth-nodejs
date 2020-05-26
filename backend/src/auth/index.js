const express = require('express');
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
const generateToken = require('../utils/generateToken');

const UserModel = require('../models/User');

const router = express.Router();

const schema = Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required().trim(),
    password: Joi.string().min(10).regex(/^[a-zA-Z0-9]{3,30}$/).required().trim()
});

// any request in /auth goes here

router.post('/signup', async (req, res, next) => {
    const { username, password } = req.body;

    try{
        const data = await schema.validateAsync({ 
            username: username,
            password: password 
        });
        
        if (await UserModel.findOne({ 'username': username }))
            return res.status(400).json({ error: 'User already in use' });
        
        bcrypt
            .hash(password, 12)
            .then(hashedPass => {
                const user = {
                    username: username,
                    password: hashedPass,
                };

                UserModel.create(user);
                user.password = undefined;
                const token = generateToken(user.id)

                return res.status(200).json({
                    result: `${user.username} is created!`,
                    token: token,
                })
            })

    } catch(err){
        next(err);
    }
});

router.post('/signin', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const data = await schema.validateAsync({
            username: username,
            password: password
        });

        const user = await UserModel.findOne({
            'username': username,
        });

        if (!user) {
            return res.status(400).json({ error: 'Unable to login' });
        }

        const result = await bcrypt.compare(password, user.password);

        if (result) {
            const token = generateToken(user.id); 
            return res.status(200).json({ token });
        }
       
        return res.status(400).json({ error: 'Failed to login' });

    } catch(err) {
        next(err);
    }
})

module.exports = router;
