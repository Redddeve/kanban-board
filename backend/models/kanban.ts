import { model } from 'mongoose';
import { boardSchema, cardSchema } from '../schemas/mongoose/kanban';

const Board = model('Board', boardSchema);

const Card = model('Card', cardSchema);

export { Board, Card };
