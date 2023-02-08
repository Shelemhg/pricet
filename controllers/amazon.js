const mongodb = require('../config/db.config.js');
const ObjectId = require('mongodb').ObjectId;

//  Names of the Database and Collections
const database = require('../config/db.config.js').database;
const collection = require('../config/db.config.js').collection;


const getAll = async (req, res, next) => {
// #swagger.tags = ['amazon']
    try {
        const result = await mongodb
            .getDb()
            .db(database)
            .collection(collection)
            .find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200)
            .json(lists);
        });
    } catch (err) {
		res.status(500).json(err);
        console.log(err.message);
	}
};



const getSingle = async (req, res, next) => {
    try {
        // #swagger.tags = ['oneProduct']
        //TODO add .trim to req.params.asin
        const toLookup =  req.params.asin.toUpperCase();            
        const result = await mongodb
        .getDb()
        .db(database)
        .collection(collection)
        .find({ asin: toLookup });

        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200)
            .json(lists[0]);
        });
    } catch (err){
        res.status(500).json(err);
        console.log(err.message);
    }
};



const createProduct = async (req, res) => {
    try {
        // #swagger.tags = ['createProduct']
        const newDate = new Date();
        
        if(!req.body.asin ||!req.body.title ||!req.body.price ||!req.body.imageUrl ||!req.body.quantity ||!req.body.url ||!req.body.comment) {
                res.status(400).send({ message: 'Missing field'});
                return;
            }
        
        const newProduct = {
            asin: req.body.asin,
            title: req.body.title,
            price: req.body.price,
            date: newDate,
            imageUrl: req.body.imageUrl,
            quantity: req.body.quantity,
            url: req.body.url,
            comment: req.body.comment
        };
        const response = await mongodb    
            .getDb()
            .db(database)
            .collection(collection)
            .insertOne(newProduct);
            
        if (response.acknowledged) {
            res.status(201)
            .json(response);
            console.log('Info saved to DB succesfully');
        } else {
            res.status(500)
            .json(response.error || 'Some error occurred while creating the contact.');
            console.log('Upload of info failed.');
        }
    } catch (err) {
		res.status(500).json(err);
    }
};



const updateProduct = async (req, res) => {
    // #swagger.tags = ['updateProduct']
    // const productId = new ObjectId(req.params.id);

    try {
        if(!req.body.asin ||!req.body.title ||!req.body.price ||!req.body.imageUrl ||!req.body.quantity ||!req.body.url ||!req.body.comment) {
            res.status(400).send({ message: 'Invalid Username Supplied' });
		    return;
        }
        const toLookup =  req.params.asin;
        const newDate = new Date();

        const updatedProduct = {
            asin: req.body.asin,
            title: req.body.title,
            price: req.body.price,
            date: newDate,
            imageUrl: req.body.imageUrl,
            quantity: req.body.quantity,
            url: req.body.url,
            comment: req.body.comment
        };
        const response = await mongodb    
            .getDb()
            .db(database)
            .collection(collection)
            .replaceOne({ asin: toLookup }, updatedProduct);
        
        if (err) {
            res.status(500).json(err || 'Some error occurred while updating the contact.');
            console.log('Upload of info failed.');
        } else {
            res.status(204).json(response);
            console.log('Info saved to DB succesfully');
        }
        
        //     if (response.modifiedCount > 0) {
        //     res.status(204).json(response);
        //     console.log('Info saved to DB succesfully');
        // } else {
        //     res.status(500).json(response.error || 'Some error occurred while creating the contact.');
        //     console.log('Upload of info failed.');
        // }
    } catch (err) {
		res.status(500).json(err);
        console.log(err.message);
	}
};



const deleteProduct = async (req, res) => {
    // #swagger.tags = ['deleteProduct']
    try {
        // const productId = new ObjectId(req.params.id);

        if (!req.params.asin) {
            res.status(400).send({ message: 'Please provide ASIN number' });
		    return;
        }

        const toLookup =  req.params.asin;
        const response = await mongodb
            .getDb()
            .db(database)
            .collection(collection)
            .deleteOne({ asin : toLookup }, true);
            console.log(response);
        if (response.deletedCount > 0) {
            res.status(200).send();
            console.log(toLookup + ' DELETED');
            } else {
            res.status(500).json(response.error || 'An error occurred while deleting the contact.');
            console.log('Unable to Delete');
            }
    } catch (err) {
		res.status(500).json(err);
        console.log(err.message);
    }
};

module.exports = { 
        getAll, 
        getSingle, 
        createProduct,
        updateProduct,
        deleteProduct
    };