import mongoose from 'mongoose';
import {
  validateEmail,
  validateUsername,
} from '../validations/user.validation.js';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    validate: {
      validator: async function (value) {
        const validationResult = await validateUsername(
          value,
          mongoose.model('User')
        );
        if (validationResult !== true) {
          throw new Error(validationResult);
        }
        return true;
      },
      message: 'Invalid username',
    },
  },
  email: {
    type: String,
    validate: {
      validator: async function (value) {
        const validationResult = await validateEmail(
          value,
          mongoose.model('User')
        );
        if (validationResult !== true) {
          throw new Error(validationResult);
        }
        return true;
      },
      message: 'Invalid email!',
    },
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: (value) => value.length === 10,
      message: 'Phone number must me 10 digits long!',
    },
  },
  password: {
    type: String,
    validate: {
      validator: (value) => value.length >= 6,
    },
    message: 'Please provide a more secure password!',
  },
});

const User = mongoose.model('User', userSchema);

export default User;
