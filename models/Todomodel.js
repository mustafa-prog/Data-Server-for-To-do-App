const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  category: {
    type: String,
    enum: ['shopping', 'kids', 'others'],
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    default: new Date(),
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

TodoSchema.method('toJSON', function () {
  return {
    category: this.category,
    text: this.text,
    _id: this._id,
    done: this.done,
    user: this.user,
    dueDate: this.dueDate,
  };
});

module.exports = model('Todo', TodoSchema);
