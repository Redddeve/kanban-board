import { Request, Response } from 'express';
import { Board } from '../../models/kanban';
import requestError from '../../utils/requestError';
import ctrlWrapper from '../../utils/ctrlWrapper';

const getBoardById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Board.findById(id);

  if (!result) {
    throw requestError(404, 'Not found');
  }

  res.status(200).json(result);
};

export default ctrlWrapper(getBoardById);
