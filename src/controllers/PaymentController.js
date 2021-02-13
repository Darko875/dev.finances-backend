const Payments = require('../models/payments')
const mongoose = require('mongoose')


module.exports = {
    async index (req, res) {
        const user_id = req.userId

        let payments = await Payments.find({user: mongoose.Types.ObjectId(user_id)}).populate('user').exec()  
        
        return res.status(200).json({payments: payments, user: req.userId})
    },

    async create (req,res) {
        const { type, value, status } = req.body;
        try {
            if (!type || !value || !status){
                return res.status(400).json({error: 'Forgot one category.'})
            }
            const user_id = req.userId;
            const newPayments = new Payments({
                type: type, 
                value: value, 
                status: status,
                user: user_id
            })

            const pay = await newPayments.save().catch(err => console.log(err));
            return res.status(200).json({payments: pay, user: req.userId})
        
        } catch (error) {
            return res.status(400).json({error: 'No payments valid', err: error})
        }
    },

    async delete(req,res){
        try {
            await Payments.findByIdAndRemove({_id: mongoose.Types.ObjectId(req.params.id)})
            return res.status(200).json('Payment eliminated.')
          } catch {
            return res.status(400).json({error: 'No payments valid', err: error})
          }
    },

    async sum_earnings(req,res){

    },

    async sum_losses(req,res){

    },

    async sum_total(req,res){

    },
}