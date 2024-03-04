import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import KanbanColumn from './Column';
import { selectBoard, selectSections } from '../redux/kanban/selectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks/hooks';
import { useEffect, useState } from 'react';
import { fetchBoardById, updatePosition } from '../redux/kanban/operations';
import { Board, Column } from '../types/types';

export interface BoardProps {
  dashboard: Board;
}

export default function KanbanBoard({ dashboard }: BoardProps) {
  const [columns, setColumns] = useState<Column[]>([]);

  const { _id, name } = dashboard;

  const dispatch = useAppDispatch();

  const board = useSelector(selectBoard);
  const sections = useSelector(selectSections);

  useEffect(() => {
    if (board && board._id !== _id) {
      dispatch(fetchBoardById(_id));
    }
  }, [dispatch, _id, board]);

  useEffect(() => {
    if (sections) {
      setColumns(sections);
    }
  }, [sections]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    const sourceColIndex = columns.findIndex(
      el => el._id === source.droppableId
    );
    const destColIndex = columns.findIndex(
      el => el._id === destination.droppableId
    );

    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];

    const sourceCards = [...sourceCol.cards];
    const destCards = [...destCol.cards];

    const newSections = [...columns];

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

      setColumns(newSections);
    } else {
      const [removed] = destCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, removed);

      newSections[destColIndex] = {
        ...destCol,
        cards: destCards,
      };

      setColumns(newSections);
    }

    try {
      if (!board) return;
      dispatch(
        updatePosition({
          boardId: board._id,
          sourceList: sourceCards,
          destList: destCards,
          sourceColId: sourceCol._id,
          destColId: destCol._id,
        })
      );
    } catch (err) {
      setColumns(columns);
      console.error(err);
    }
  };

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result)}>
      <div className="flex flex-grow flex-col gap-4 ">
        <h1 className="text-center text-2xl font-semibold">{name}</h1>
        <div className="flex justify-around gap-4">
          {columns &&
            columns?.map(column => (
              <KanbanColumn key={column._id} column={column} />
            ))}
        </div>
      </div>
    </DragDropContext>
  );
}
