const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    create_at: {
        type: Date,
        default: Date.now() 
    },
    update_at: {
        type: Date,
        default: Date.now()
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;