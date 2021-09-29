const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const app = express();
app.use(morgan('short'));

app.get('/',(req,res) => {
    res.send("hello from express app");
});

app.listen(3000,() =>{
    debug(`listening at port ${chalk.green('3000')}`);
});