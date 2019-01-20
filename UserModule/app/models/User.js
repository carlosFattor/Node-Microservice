const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  activated: {
    type: String
  },
  userStatus: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString()
  },
  updatedAt: {
    type: Date,
    default: new Date().toISOString()
  },
  tokens: {
    type: Array,
    default: []
  },
  profile: {
    firstName: String,
    lastName: String,
    gender: String,
    location: Object,
    bourn: Date,
    phone: Number,
    avatar: String,
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    roles: Array
  }
}, {
  timestamps: true
});

UserSchema.plugin(uniqueValidator, {
  message: 'is already taken.'
});

/**
 * Password hash middleware.
 */
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    callback(err, isMatch);
  });
};

UserSchema.methods.generateJWT = function (secret, expiresIn) {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    accountId: this.profile.accountId,
    roles: this.profile.roles
  }, secret, {
    expiresIn: expiresIn
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;