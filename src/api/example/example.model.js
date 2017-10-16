import mongoose from 'mongoose';

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

export default mongoose.model('Example', ExampleSchema);
