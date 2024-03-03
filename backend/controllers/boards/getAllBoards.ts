import { Request, Response } from 'express';
import { Board } from '../../models/kanban';
import ctrlWrapper from '../../utils/ctrlWrapper';

const getAllBoards = async (req: Request, res: Response) => {
  try {
    const result = await Board.find({}, '-sections');

    if (result.length) {
      res.json(result);
    } else {
      res.json([]);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default ctrlWrapper(getAllBoards);
