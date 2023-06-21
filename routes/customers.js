const errors = require('restify-errors');
const Customer = require('../models/customers');

module.exports = server => {
    // Get all customers
    server.get('/customers', async(req, res) => {
        // res.send({msg: 'test'});
        try{
            const customers = await Customer.find({});
            res.send(customers);
           
        }catch(err){
            return (errors.InvalidContentError(err));
        }
    });

    // Get a single customer
    server.get('/customer/:id', async(req, res) => {
        try{
            const customer = await Customer.findById(req.params.id);
            res.send(customer);
            
        }catch(err){
            return (new errors.ResourceNotFoundError(`No customer with the id : ${req.params.id}`));
        }
    });

    // Add a customer
    server.post('/customers', async(req, res) => {
        if(!req.is('application/json'))return (errors.InvalidContentError('Expect application/json'));

        const {name, email, balance} = req.body;
        const customer = new Customer({name, email, balance});
        try{
            const newCustomer = await customer.save();
            res.send();
            
        }catch(err){
            return (new errors.ResourceNotFoundError(err.message));
        }
    });

    // Update a customer
    server.put('/customer/:id', async(req, res) => {
        if(!req.is('application/json'))return next(errors.InvalidContentError('Expect application/json'));

        try{
            const customer = await Customer.findOneAndUpdate({_id:req.params.id}, req.body);
            res.send();
            
        }catch(err){
            return (new errors.ResourceNotFoundError(`No customer with the id : ${req.params.id}`));
        }
    });

    // Delete a customer
    server.del('/customer/:id', async(req, res) => {
        try{
            const customer = await Customer.findOneAndRemove({_id:req.params.id});
            res.send(204);
            
        }catch(err){
            return (new errors.ResourceNotFoundError(`No customer with the id : ${req.params.id}`));
        }
    });
}