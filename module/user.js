const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/arnowa', { useNewUrlParser: true, useUnifiedTopology: true})
var conn = mongoose.Connection;

var userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true,
    },
    records:[Number],
    
});

var userModel = mongoose.model('users', userSchema);
module.exports = userModel;
