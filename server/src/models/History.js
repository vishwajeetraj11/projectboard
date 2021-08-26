import mongoose from 'mongoose';

const historySchema = mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
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
    action: {
      type: String,
      enum: [
        'create',
        'update',
        'delete',
        'change',
        'assign',
        'add-member',
        'remove-member',
      ],
      required: true,
    },
    extraDetails: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

export const History = mongoose.model('History', historySchema);
