const mongoose = require('mongoose');

const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    userId : {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('User', userSchema);