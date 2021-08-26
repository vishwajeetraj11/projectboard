import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Task',
  },
  comment: {
    type: String,
    required: true,
  },
});

export const Comment = mongoose.model('Comment', commentSchema);
