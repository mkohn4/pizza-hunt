const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

//get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    //return all comments
    //return this.comments.length;
    //return comments count and reply count to comments
    //use reduce method to tally up total of every comment with its replies
    //it takes the accumulator = total and currentValue = comment
    //then performs a function whereby we add for each comment, the total # of replies and add to the total
    return this.comments.reduce((total,comment) => total + comment.replies.length + 1, 0);
});

//create the Pizza Model using the PIzzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the pizza model
module.exports = Pizza;