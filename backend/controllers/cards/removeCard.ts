import { Request, Response } from 'express';
import ctrlWrapper from '../../utils/ctrlWrapper';
import { Board, Card } from '../../models/kanban';
import requestError from '../../utils/requestError';
import { CardProp } from '../../types/types';

const removeCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Card.findById(id);
    if (!result) {
      return requestError(404, 'Card not found');
    }

    const boardId = result.board;

    const board = await Board.findById(boardId);
    if (!board) {
      return requestError(404, 'Board not found');
    }

    await Card.findByIdAndDelete(id);

    for (const key in board.sections) {
      const section = board.sections[key];
      const itemIndex = section.cards.findIndex(
        (card: CardProp) => card._id.toString() === id,
      );

      if (itemIndex !== -1) {
        section.cards.splice(itemIndex, 1);

        for (const key in section.cards) {
          await Card.findByIdAndUpdate(section.cards[key]._id, {
            $set: { position: key },
          });
        }
        const cards = await Card.find({ section: result.section }).sort(
          'position',
        );
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

export default ctrlWrapper(removeCard);
