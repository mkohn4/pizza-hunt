const { Pizza } = require ('../models');

const pizzaController = {
    //functions will go in here as methods
    //get all pizzas
    getAllPizza(req,res) {
        Pizza.find({})
            //add related comments data from subdocument and remove __v
            .populate({
                path: 'comments',
                select: '-__v'
            })
            //remove __v attribute from pizza
            .select('-__v')
            //sort pizza so newest returns first (DESC order by ID value)
            .sort({_id: -1})
            //return pizza json data
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //get one pizza by id
    getPizzaById({params}, res) {
        Pizza.findOne({_id: params.id})
            //add comments for said pizza
            .populate({
                path: 'comments',
                select: '-__v'
            })
            //remove __v from pizza
            .select('-__v')
            //return pizza data with nested comment subdocuments
            .then(dbPizzaData => {
                //if no pizza found, send 404
                if (!dbPizzaData) {
                    res.status(404).json({message: 'No pizza found with this id'});
                    return;
                }
                res.json(dbPizzaData);
            }).catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    //create pizza
    createPizza({body}, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },
    //update pizza by id
    updatePizza ({params, body}, res) {
        Pizza.findOneAndUpdate({ _id: params.id}, body, {new:true, runValidators: true})
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({message: 'No pizza found with this id!'})
                    return;
                }
                res.json(dbPizzaData);
            }).catch(err => res.status(400).json(err));
    },
    deletePizza ({params}, res) {
        Pizza.findOneAndDelete({_id: params.id})
            .then(dbPizzaData => {
                if(!dbPizzaData) {
                    res.status(404).json({message: 'No pizza found with this id'});
                    return;
                }
                res.json(dbPizzaData);
            }).catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;