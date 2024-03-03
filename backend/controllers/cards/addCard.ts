import { Request, Response } from 'express';
import { Board, Card } from '../../models/kanban';
import ctrlWrapper from '../../utils/ctrlWrapper';
import requestError from '../../utils/requestError';

const addCard = async (req: Request, res: Response) => {
  const { boardId, sectionId } = req.body;

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return requestError(404, 'Board not found');
    }
    for (const key in board.sections) {
      if (board.sections[key].id === sectionId) {
        const cardsCount = await Card.find({
          section: sectionId,
        }).countDocuments();

        const newCard = new Card({
          title: 'Task',
          content: 'Description',
          section: sectionId,
          board: boardId,
          position: cardsCount > 0 ? cardsCount : 0,
        });
        await Card.create(newCard);

        board.sections[key].cards.push(newCard);
        await board.save();

        res.status(201).json(board);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export default ctrlWrapper(addCard);
