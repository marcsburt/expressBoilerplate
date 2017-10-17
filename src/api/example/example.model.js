import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../../config/APIerror';

const Schema = mongoose.Schema;

const ExampleSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

ExampleSchema.statics = {
  list() {
    return this.find()
      .exec()
      .then(data => {
        if (data) {
          return data;
        }
        const err = new APIError(httpStatus.NOT_FOUND);
        return Promise.reject(err);
      })
  },

  getOne(name) {
    return this.findOne(name)
      .exec()
      .then(data => {
        if (data) {
          return data
        }
        const err = new APIError(httpStatus.NOT_FOUND);
        return Promise.reject(err);
      })
  }
}

export default mongoose.model('Example', ExampleSchema);
