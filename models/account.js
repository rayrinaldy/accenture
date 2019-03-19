const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

let Account = new Schema({
    username: String,
    password: String,
    name: {
        firstName: String,
        lastName: String
    },
    address: String,
    email: String,
    phone: String,
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

Account.pre('save', (next) => {
    // get the current date
    let currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

Account.plugin(passportLocalMongoose, {
    usernameLowerCase: true
});

module.exports = mongoose.model('accounts', Account);
