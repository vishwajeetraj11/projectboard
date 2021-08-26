import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
  {
    order: {
      type: Number,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Project',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Member',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: 'No Description',
    },
    label: {
      type: String,
      default: 'No Label',
      enum: ['Bug', 'Feature', 'Improvement', 'No Label'],
    },
    priority: {
      type: String,
      default: 'no_priority',
      enum: ['no_priority', 'low', 'medium', 'high', 'urgent'],
    },
    status: {
      type: String,
      default: 'backlog',
      enum: ['backlog', 'todo', 'in_progress', 'done', 'cancelled'],
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

taskSchema.index({ order: 1 });

export const Task = mongoose.model('Task', taskSchema);
