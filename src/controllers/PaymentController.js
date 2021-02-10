const Payment = require('../models/payments')
const mongoose = require('mongoose')


module.exports = {
    async index (req, res) {
        const user_id = req.userId

        let payments = await Payment.find({user: mongoose.Types.ObjectId(user_id)}).populate('user').exec()  
        
        return res.status(200).json({payments: payments, user: req.userId})
    }
}