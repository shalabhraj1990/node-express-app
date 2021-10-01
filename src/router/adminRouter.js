const express = require('express');
const debug = require('debug')('adminRouter');
const { MongoClient } = require('mongodb');
const sessions = require('../data/sessions.json');

const adminRouter = express.Router();

adminRouter.route('/')
    .get((req, res) => {
        const url = "mongodb+srv://shalabhraj1990:VR8XlF82mgfKAw9M@shalabhcluster0.fojye.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const dbName = 'globamantics';
        (async function mongo() {

            try {
                let client = await MongoClient.connect(url);
                const db = client.db(dbName);
                const response = await db.collection('sessions').insertMany(sessions);
                res.json(response);
            }
            catch (err) {
                debug(err.stack);
            }
        })();
    });

    module.exports = adminRouter;
