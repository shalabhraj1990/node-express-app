const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser')
const session = require('express-session');

const PORT = process.env.PORT || 3000;
//Router
const sessionRouter = require('./src/router/sessionRouter');
const adminRouter = require('./src/router/adminRouter');
const authRouter = require('./src/router/authRouter');
//middleware
const app = express();
app.use(morgan('short'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());// to parse the post request body from form
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret:'secretkey'}));
require('./src/config/passport')(app);
app.use('/sessions', sessionRouter);
app.use('/admin',adminRouter);
app.use('/auth',authRouter);
//template engin ejs
app.set('views', './src/veiws');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'welcome to goabalmantics', data: ['a', 'b', 'c'] });
});

app.listen(PORT, () => {
    debug(`listening at PORT ${chalk.green(PORT)}`);
});