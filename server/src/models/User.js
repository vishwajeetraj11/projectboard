import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      index: {
        unique: true,
        partialFilterExpression: { username: { $type: 'string' } },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email_verified: {
      type: Boolean,
    },
    photo: {
      type: String,
    },
    tenant: {
      type: String,
      select: false,
    },
    transaction: {
      type: mongoose.Schema.Types.Mixed,
      select: false,
    },
    client_id: {
      type: String,
      select: false,
    },
    connection: {
      type: String,
      select: false,
    },
    request_language: {
      type: String,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
userSchema.virtual('projects', {
  ref: 'Member',
  foreignField: 'user',
  localField: '_id',
});

// userSchema.set('toObject', { virtuals: true });
// userSchema.set('toJSON', { virtuals: true });

export const User = mongoose.model('User', userSchema);
