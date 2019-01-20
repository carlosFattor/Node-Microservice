const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const AccountSchema = new mongoose.Schema({
  name: String
});

AccountSchema.plugin(uniqueValidator, {message: 'is already taken.'});
const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;