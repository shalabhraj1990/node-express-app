const passport = require('passport');
const {Strategy} = require('passport-local');
const debug = require('debug')('app:localStrategy')
const { MongoClient ,ObjectId} = require('mongodb');
 module.exports = function localStrategy(){
     passport.use(
         new Strategy({usernameField:'username',passwordField:'password'},(username,password,done) => {
             //check the DB or insert into the DB
             const url = "mongodb+srv://shalabhraj1990:VR8XlF82mgfKAw9M@shalabhcluster0.fojye.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
             const dbName = 'globamantics';
             let client = '';
             (async function validateUser() {

                try {
                    client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const user = await db.collection('users').findOne({username});
                    client.close();
                    if(user && user.password === password){
                        done(null,user);
                    }
                    else
                    {
                        done(null,false);
                    }
               
                }
                catch (err) {
                    debug(err.stack);
                    client.close();
                    done(err,false);
                }
            })();
         })
     )
 }