const express = require('express');
const debug = require('debug')('app:authRouter');
const { MongoClient, ObjectId } = require('mongodb');
const passport = require('passport');
const authRouter = express.Router();

authRouter.route('/signup').post((req, res) => {
    //create user
    const { username, password } = req.body;
    const url = "mongodb+srv://shalabhraj1990:VR8XlF82mgfKAw9M@shalabhcluster0.fojye.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const dbName = 'globamantics';
    (async function mongo() {

        try {
            let client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const user = { username, password };
            const results = await db.collection('users').insertOne(user);
            client.close();
            debug(results);
            if(results.acknowledged){
                req.login(user, () => {
                    res.redirect('/auth/profile');
                })
            }
            
        }
        catch (err) {
            debug(err.stack);
        }
    })();


});
authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
});
authRouter.route('/signin').get((req, res) => {
    res.render('signin');
}).post(passport.authenticate('local',{
    successRedirect:'/auth/profile',
    failureRedirect:'/'
}));

module.exports = authRouter;