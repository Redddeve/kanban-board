import { Request, Response } from 'express';
import { Board } from '../../models/kanban';
import requestError from '../../utils/requestError';
import ctrlWrapper from '../../utils/ctrlWrapper';

const removeBoard = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Board.findById(id);

    if (!result) {
      return requestError(404, 'Not found');
    }

    await Board.findByIdAndDelete(id);

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default ctrlWrapper(removeBoard);
