const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;

const mongoose = require('mongoose');
const config = require('./db/DB');
const taskRoute = require('./routes/task.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB,{useNewUrlParser:true}).then(
    () => {console.log('Database is connected')},
    err => {console.log('can not be connected to database' + err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/task',taskRoute);

app.listen(PORT,function () {
    console.log('server is runing : ',PORT);
});