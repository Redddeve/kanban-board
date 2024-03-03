import { Request, Response } from 'express';
import { Board } from '../../models/kanban';
import requestError from '../../utils/requestError';
import ctrlWrapper from '../../utils/ctrlWrapper';

const updateBoardName = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await Board.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
      },
    );

    if (!result) {
      return requestError(404, 'Not found');
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default ctrlWrapper(updateBoardName);
