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
  }
}

export default userSchema