import { Schema } from "express-validator";

const cardListSchema: Schema = {
  name: {
    isString: true,
    isLength: {
      errorMessage: 'board_name should be at least 255 chars long',
      options: { min: 3, max: 255 }
    }
  }
}

export default cardListSchema;