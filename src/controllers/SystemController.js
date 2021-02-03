const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

module.exports = {
    async index(req,res) {
        let users = await User.find({})

        return res.status(200).json(users)
    },

    async create(req,res) {
        const { name, email, password} = req.body;

  
       if (!name || !email || !password) {
            res.status(400).json('Dados incorretos')
        }
        
        else {
        User.findOne({ email: email }).then(user => {
            const newUser = new User({
                name,
                email,
                password})
    
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => {
                        res.status(200).json('Utilizador ' + user.name + ' criado!')
                    })
                    .catch(err => res.status(400).json(err));
                })
            })
            })
        }
    },
    async authenticate (req,res) {
        const {email, password} = req.body
        //res.json({email: email, password: password})
        User.findOne({
            email: email
          }).then(user => {
            if (!user) {
              return done(null, false, { message: 'That email is not registered' });
            }
    
            // Match password
            bcrypt.compare(password, user.password, (isMatch) => {
              if (isMatch) {
                let token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
                    expiresIn: 86400 // 24 hours
                })
                res.header({token: token})
                return res.status(200).json({email: user.email, token: token})
              } else {
                return res.json({ message: 'Password incorrect' })
              }
            })
          })
    },
    
}
