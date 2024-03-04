import { Droppable } from '@hello-pangea/dnd';
import { FiPlus } from 'react-icons/fi';
import TaskCard from './TaskCard';
import type { Column } from '../types/types';
import { useSelector } from 'react-redux';
import { selectBoard } from '../redux/kanban/selectors';
import { useAppDispatch } from '../hooks/hooks';
import { createCard } from '../redux/kanban/operations';

interface ColumnProps {
  column: Column;
}

export default function Column({ column }: ColumnProps) {
  const { id, title, cards } = column;

  const dispatch = useAppDispatch();
  const board = useSelector(selectBoard);

  function addCard(sectionId: string) {
    if (board) {
      dispatch(createCard({ sectionId, boardId: board._id }));
    }
  }

  return (
    <div
      key={id}
      className="flex flex-col justify-start min-w-80 w-[350px] h-[550px] text-textColor "
    >
      <h2 className="p-4 text-center text-lg font-semibold rounded-t-md border-4 border-solid border-neutral">
        {title}
      </h2>
      <Droppable key={id} droppableId={id}>
        {(provided, snapshot) => (
          <div
            className="flex flex-grow flex-col items-center gap-3 p-3 min-h-32 overflow-x-hidden overflow-y-auto bg-neutral transition"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              backgroundColor: snapshot.isDraggingOver ? '#3b4552' : '#2a323c',
            }}
          >
            {cards.length !== 0 &&
              cards?.map((card, idx) => (
                <TaskCard key={card._id} card={card} index={idx} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        className="flex gap-2 items-center p-4 rounded-b-md bg-neutral border-4 border-solid border-neutral hover:bg-inherit  transition"
        onClick={() => addCard(column.id)}
      >
        <FiPlus />
        Add task
      </button>
    </div>
  );
}
