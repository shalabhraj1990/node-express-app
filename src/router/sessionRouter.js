const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient ,ObjectId} = require('mongodb');

const sessionRouter = express.Router();
//middleware
sessionRouter.use((req,res,next) => {
if(req.user){
    next();
}
else{
    res.redirect('/auth/signin');
}
});
//Router
sessionRouter.route('/')
    .get((req, res) => {
        const url = "mongodb+srv://shalabhraj1990:VR8XlF82mgfKAw9M@shalabhcluster0.fojye.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const dbName = 'globamantics';
        (async function mongo() {

            try {
                let client = await MongoClient.connect(url);
                const db = client.db(dbName);
                const sessions = await db.collection('sessions').find().toArray();
                res.render('sessions',{sessions});
                client.close();
            }
            catch (err) {
                debug(err.stack);
            }
        })();
    });

sessionRouter.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        const url = "mongodb+srv://shalabhraj1990:VR8XlF82mgfKAw9M@shalabhcluster0.fojye.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const dbName = 'globamantics';
        (async function mongo() {

            try {
                let client = await MongoClient.connect(url);
                const db = client.db(dbName);
                const session = await db.collection('sessions').findOne({_id:new ObjectId(id)});
                res.render('session',{session});
            }
            catch (err) {
                debug(err.stack);
            }
        })();
      
    });
module.exports = sessionRouter;