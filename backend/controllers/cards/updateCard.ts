import { Request, Response } from 'express';
import { Board, Card } from '../../models/kanban';
import ctrlWrapper from '../../utils/ctrlWrapper';
import requestError from '../../utils/requestError';
import { CardProp } from '../../types/types';

const updateCardContent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const card = await Card.findById(id);
    if (!card) {
      return requestError(404, 'Card not found');
    }

    const boardId = card.board;

    const board = await Board.findById(boardId);
    if (!board) {
      return requestError(404, 'Board not found');
    }

    await Card.findByIdAndUpdate(id, req.body, { new: true });

    for (const key in board.sections) {
      const section = board.sections[key];
      const itemIndex = section.cards.findIndex(
        (card: CardProp) => card._id.toString() === id,
      );

      if (itemIndex !== -1) {
        const cards = await Card.find({ section: card.section });
        section.cards = cards;

        await board.save();

        res.status(200).json(board);
        return;
      }
    }
    res.status(404).json({ error: 'Not found' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default ctrlWrapper(updateCardContent);
