const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// When a GET request is received, this function is executed and it prints to the browser all the files in the database.
const getAll = async (req, res, next) => {
// #swagger.tags = ['amazon']
const result = await mongodb.getDb().db().collection('amazon').find();
result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
});
};

// When a GET request is received, this function expects an ID and prints to the web browser all the info of the ID
const getSingle = async (req, res, next) => {
// #swagger.tags = ['oneProduct']
const userId = new ObjectId(req.params.id);
const result = await mongodb
    .getDb()
    .db()
    .collection('amazon')
    .find({ _id: userId });
result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
});
};


const createProduct = async (req, res) => {
    // #swagger.tags = ['createProduct']
    const newDate = new Date();
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
        .db()
        .collection('amazon')
        .insertOne(newProduct);
    if (response.acknowledged) {
        res.status(201).json(response);
        console.log('Info saved to DB succesfully');
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
        console.log('Upload of info failed.');
    }
};


const updateProduct = async (req, res) => {
    // #swagger.tags = ['updateProduct']
    const productId = new ObjectId(req.params.id);
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
        .db()
        .collection('amazon')
        .replaceOne({ _id: productId }, updatedProduct);
    if (response.modifiedCount > 0) {
        res.status(204).json(response);
        console.log('Info saved to DB succesfully');
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
        console.log('Upload of info failed.');
    }
};


const deleteProduct = async (req, res) => {
    // #swagger.tags = ['deleteProduct']
    const productId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDb()
        .db()
        .collection('amazon')
        .deleteOne({ _id: productId }, true);
        console.log(response);
    if (response.deletedCount > 0) {
        res.status(200).send();
        console.log(productId + ' DELETED');
        } else {
        res.status(500).json(response.error || 'An error occurred while deleting the contact.');
        console.log('Unable to Delete');
        }
};

module.exports = { 
        getAll, 
        getSingle, 
        createProduct,
        updateProduct,
        deleteProduct
    };