import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import KanbanColumn from './Column';
import { selectBoard } from '../redux/kanban/selectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks/hooks';
import { useEffect, useState } from 'react';
import { fetchBoardById, updatePosition } from '../redux/kanban/operations';
import { Board, Column } from '../types/types';

export interface BoardProps {
  dashboard: Board;
}

export default function KanbanBoard({ dashboard }: BoardProps) {
  const [sections, setSections] = useState<Column[]>([]);

  const { _id, name } = dashboard;

  const dispatch = useAppDispatch();

  const board = useSelector(selectBoard);

  useEffect(() => {
    if (board && board._id !== _id) {
      dispatch(fetchBoardById(_id));
    }
  }, [dispatch, _id, board]);

  useEffect(() => {
    if (board && board.sections) {
      setSections([
        board.sections.todo,
        board.sections.inProgress,
        board.sections.done,
      ]);
    }
  }, [board]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    const sourceColIndex = sections.findIndex(
      (e) => e.id === source.droppableId
    );
    const destColIndex = sections.findIndex(
      (e) => e.id === destination.droppableId
    );

    const sourceCol = sections[sourceColIndex];
    const destCol = sections[destColIndex];

    const sourceCards = [...sourceCol.cards];
    const destCards = [...destCol.cards];

    const newSections = [...sections];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, removed);

      newSections[sourceColIndex] = {
        ...sourceCol,
        cards: sourceCards,
      };
      newSections[destColIndex] = {
        ...destCol,
        cards: destCards,
      };

      setSections(newSections);
    } else {
      const [removed] = destCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, removed);

      newSections[destColIndex] = {
        ...destCol,
        cards: destCards,
      };

      setSections(newSections);
    }

    try {
      if (!board) return;
      dispatch(
        updatePosition({
          boardId: board._id,
          sourceList: sourceCards,
          destList: destCards,
          sourceColId: sourceCol.id,
          destColId: destCol.id,
        })
      );
    } catch (err) {
      setSections(sections);
      console.error(err);
    }
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <div className="flex flex-grow flex-col gap-4 ">
        <h1 className="text-center text-2xl font-semibold">{name}</h1>
        <div className="flex justify-around gap-4">
          {sections &&
            sections?.map((column) => (
              <KanbanColumn key={column.id} column={column} />
            ))}
        </div>
      </div>
    </DragDropContext>
  );
}
