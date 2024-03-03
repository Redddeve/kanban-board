import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../../models/kanban';
import ctrlWrapper from '../../utils/ctrlWrapper';

const addBoard = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const newBoard = new Board({
      name,
      sections: {
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
      },
    });

    const result = await Board.create(newBoard);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default ctrlWrapper(addBoard);
