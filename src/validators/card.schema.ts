import { Schema } from "express-validator";

const cardSchema: Schema = {
  name: {
    isString: true,
    isLength: {
      errorMessage: 'card_name should be at least 3 chars long',
      options: { min: 3, max: 50 }
    }
  }
}

export default cardSchema;