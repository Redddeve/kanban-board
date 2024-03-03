import { Request, Response } from 'express';
import ctrlWrapper from '../../utils/ctrlWrapper';
import { Board, Card } from '../../models/kanban';
import requestError from '../../utils/requestError';

const updatePosition = async (req: Request, res: Response) => {
  const { boardId, sourceList, destList, sourceColId, destColId } = req.body;

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return requestError(404, 'Board not found');
    }

    if (sourceColId !== destColId) {
      for (const key in sourceList) {
        await Card.findByIdAndUpdate(sourceList[key]._id, {
          $set: { position: key },
        });
      }
    }
    for (const key in destList) {
      await Card.findByIdAndUpdate(destList[key]._id, {
        $set: { section: destColId, position: key },
      });
    }
    const sourceCards = await Card.find({ section: sourceColId }).sort(
      'position',
    );
    const destCards = await Card.find({ section: destColId }).sort('position');

    for (const key in board.sections) {
      if (board.sections[key].id === sourceColId) {
        board.sections[key].cards = sourceCards;
      }

      if (board.sections[key].id === destColId) {
        board.sections[key].cards = destCards;
      }

      await board.save();
    }

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default ctrlWrapper(updatePosition);
