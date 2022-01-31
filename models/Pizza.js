const {Schema, model} = require('mongoose');

const PIzzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

//create the Pizza Model using the PIzzaSchema
const Pizza = model('Pizza', PIzzaSchema);

//export the pizza model
module.exports = Pizza;