import { Request, Response } from 'express';
import { Card } from '../../models/kanban';
import ctrlWrapper from '../../utils/ctrlWrapper';

const updateCardContent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Card.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default ctrlWrapper(updateCardContent);
