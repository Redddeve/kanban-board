import { Request, Response } from 'express';
import { Board } from '../../models/kanban';
import requestError from '../../utils/requestError';
import ctrlWrapper from '../../utils/ctrlWrapper';

const updateBoardById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = Board.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw requestError(404, 'Not found');
  }

  res.status(200).json(result);
};

export default ctrlWrapper(updateBoardById);
