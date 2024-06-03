const express = require('express')
const router = express()
const User = require('../model/users')
const { Validation }= require('../dataValidation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res) => { 
    const { error } = Validation.registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
    }

    const emalExists = await User.findOne({ email: req.body.email })
    if(emalExists) return res.status(400).send('Email is already registered.');
    
    //encrypt password
    const encryptedPassword = await bcrypt.hash(req.body.password, 10)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword
    });

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err){
        res.status(400).send(err);
    }
})

router.post('/login', async (req, res) => { 
    const { error } = Validation.loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
    }
    const userInDB = await User.findOne({ email: req.body.email });
    if(!userInDB) return res.status(400).send('Email not registered.');
    
    const hashedPassword =  await hashPassword(userInDB)
    const validPassword = await bcrypt.compare(req.body.password, hashedPassword);
    if(!validPassword) return res.status(401).send('Invalid password!');

    const token = jwt.sign({_id: userInDB._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).status(200).send(token)
    // res.status(200).send('Logged In');
})

async function hashPassword (user) {
    const password = user.password
    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
    return hashedPassword
  }
module.exports = router