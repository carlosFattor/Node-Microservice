const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: Date,
  tokens: {
    type: Array,
    default: []
  },
  roles: Array,
  accountId: {
    type: String,
    required: true
  },
  profile: {
    name: String,
    lastName: String,
    gender: String,
    location: String,
    bourn: Date,
    phone: Number,
    avatar: String
  }
}, {
  timestamps: true
})

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
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
userSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    callback(err, isMatch);
  });
};

/*
 * Returning a simple user
 */
userSchema.methods.simpleUser = function simpleUser(user) {
  const email = user.email;
  const response = {
    email: email,
    updatedAt: user.updatedAt,
    roles: user.roles,
    profile: user.profile
  };
  return response;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
