import { Schema } from "express-validator";

const boardSchema: Schema = {
  board_name: {
    isString: true,
    isLength: {
      errorMessage: 'board_name should be at least 255 chars long'
    }
  }
}

export default boardSchema;