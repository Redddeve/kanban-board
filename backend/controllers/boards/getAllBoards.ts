import { Request, Response } from 'express';
import { Board } from '../../models/kanban';
import ctrlWrapper from '../../utils/ctrlWrapper';

const getAllBoards = async (req: Request, res: Response) => {
  const result = await Board.find();

  if (result.length) {
    res.json(result);
  } else {
    res.json(null);
  }
};

export default ctrlWrapper(getAllBoards);
