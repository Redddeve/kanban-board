import { Schema } from 'mongoose';

export const schemaOptions = { versionKey: false, timestamps: true };

export const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['todo', 'inProgress', 'done'],
      required: true,
    },
    index: Number,
  },
  schemaOptions,
);

export const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    todo: {
      id: { type: String, required: true },
      cards: [cardSchema],
      title: { type: String, required: true },
    },
    inProgress: {
      id: { type: String, required: true },
      cards: [cardSchema],
      title: { type: String, required: true },
    },
    done: {
      id: { type: String, required: true },
      cards: [cardSchema],
      title: { type: String, required: true },
    },
  },
  schemaOptions,
);
