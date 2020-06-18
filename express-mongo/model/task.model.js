const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({
    task : {
        type: String
    },
    status : {
        type: Boolean
    }
},{
    collection : 'task'
});

module.exports = mongoose.model('Task',Task);