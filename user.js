const mongoose = require('mongoose');
const me = require('mongoose-encryption');


let secret = "Letscypherit.";

const userSchema = new mongoose.Schema({
    name: String,
    mail: String,
    password: String
});

userSchema.plugin(me, {secret: secret, encryptedFields:["password"]});

module.exports = mongoose.model('User', userSchema);