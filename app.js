const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 3000;
//middleware
const app = express();
app.use(morgan('short'));
app.use(express.static(path.join(__dirname,'/public/')));
//template engin ejs
app.set('views','./src/veiws');
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render('index',{title:'welcome to goabalmantics',data:['a','b','c']});
});

app.listen(PORT,() =>{
    debug(`listening at PORT ${chalk.green(PORT)}`);
});