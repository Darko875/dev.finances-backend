const mongoose = require('mongoose')
const User = require('../models/user')
const Payments = require('../models/payments')
const bcrypt = require('bcrypt')
const { response } = require('express')

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
    }
}
