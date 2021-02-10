const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

function generateToken(params = {}){
  return jwt.sign(params, process.env.JWT_KEY, {
      expiresIn: 86400 // 24 hours
  })
}


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
                        res.status(200).send({user: user.name, token: generateToken({ id: user.id })})
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
              return res.status(400).json('That email is not registered')
            }
    
            // Match password
            bcrypt.compare(password, user.password, (isMatch) => {
              if (isMatch) {
                
                return res.status(200).json({email: user.email, token: generateToken({ id: user.id })})
              } else {
                return res.json({ message: 'Password incorrect' })
              }
            })
          })
    },
    
}
