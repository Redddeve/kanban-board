import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../../models/kanban';
import ctrlWrapper from '../../utils/ctrlWrapper';

const addBoard = async (req: Request, res: Response) => {
  const { name } = req.body;

  const newBoard = new Board({
    name,
    todo: {
      title: 'To Do',
      cards: [],
      id: uuidv4(),
    },
    inProgress: {
      title: 'In Progress',
      cards: [],
      id: uuidv4(),
    },
    done: {
      title: 'Done',
      cards: [],
      id: uuidv4(),
    },
  });

  const result = await Board.create(newBoard);

  res.status(201).json(result);
};

export default ctrlWrapper(addBoard);
