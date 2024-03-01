import { Request, Response } from 'express';
import { Board } from '../../models/kanban';
import requestError from '../../utils/requestError';
import ctrlWrapper from '../../utils/ctrlWrapper';

const removeBoardById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Board.findById(id);

  if (!result) {
    throw requestError(404, 'Not found');
  }

  await Board.findByIdAndDelete(id);

  res.status(204).end();
};

export default ctrlWrapper(removeBoardById);
