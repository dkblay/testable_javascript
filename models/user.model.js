const mongoose  = require('mongoose');

let Schema  = mongoose.Schema;
let roles = ['user', 'admin'];

let userSchema  = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    email: {
      type: String,
      required: true  
    },
    registrationDate: {
        type: Date
    },
    borrowedBooksCount: {
        type: Number
    },
    role: {
        type: String,
        enum: roles
    }
});

userSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

module.exports  = mongoose.model('User', userSchema, 'users');