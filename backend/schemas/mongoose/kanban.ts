import { Schema } from 'mongoose';

export const schemaOptions = { versionKey: false, timestamps: true };

export const cardSchema = new Schema(
  {
    board: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'Task',
    },
    content: {
      type: String,
      default: 'Description',
    },
    position: {
      type: Number,
    },
  },
  schemaOptions,
);

export const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sections: {
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
  },
  schemaOptions,
);
