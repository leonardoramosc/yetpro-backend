import { Schema } from 'express-validator';

const userSchema: Schema = {
  first_name: {
    isString: true,
    toLowerCase: true,
    rtrim: true,
    ltrim: true,
  },
  last_name: {
    isString: true,
    toLowerCase: true,
    rtrim: true,
    ltrim: true,
  },
  email: {
    errorMessage: 'Please provide a valid email.',
    isEmail: {
      bail: true,
    },
    rtrim: true,
    ltrim: true,
  },
  password: {
    isLength: {
      errorMessage: 'Password should be between 7 and 16 chars long',
      // Multiple options would be expressed as an array
      options: { min: 7, max: 16 },
    },
  },
  passwordConfirm: {
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
    
        // Indicates the success of this synchronous custom validator
        return true;
      }
    }
  }
}

export default userSchema