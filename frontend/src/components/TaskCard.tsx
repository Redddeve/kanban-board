import { Draggable } from '@hello-pangea/dnd';
import { RxPencil2 } from 'react-icons/rx';
import { FiTrash2 } from 'react-icons/fi';
import { Card } from '../types/types';
import { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { deleteCard } from '../redux/kanban/operations';

export interface CardProps {
  card: Card;
  index: number;
}

export default function TaskCard({ card, index }: CardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();

  function removeItemById(id: string) {
    dispatch(deleteCard(id));
  }

  return (
    <Draggable key={card._id} draggableId={`${card._id}`} index={index}>
      {(provided) => (
        <div
          className="card w-full max-w-80 bg-base-100 shadow-xl"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {isEditing && (
            <div className="card-body p-4 max-h-56">
              <input
                autoFocus
                onBlur={() => setIsEditing(false)}
                // onChange={(e) => updateCardTitle(card, e.target.value)}
                value={card.title}
                className="card-title p-0.5 text-base font-medium "
              />
              <textarea className="my-auto h-[90%] w-full overflow-auto whitespace-pre-wrap ">
                {card.content}
              </textarea>
            </div>
          )}
          <div className="card-body p-4 max-h-56 ">
            <p className="card-title p-0.5 text-base font-medium ">
              {card.title}
            </p>
            <p className="my-auto h-[90%] w-full overflow-auto whitespace-pre-wrap ">
              {card.content} - {card._id}
            </p>

            <div className="card-actions justify-end">
              <button
                type="button"
                // onClick={() => editItemById(card, cards)}
                className="p-2 bg-slate-200 rounded-xl text-black hover:opacity-70 transition"
                aria-label="Edit"
              >
                <RxPencil2 />
              </button>
              <button
                type="button"
                onClick={() => removeItemById(card._id)}
                className="p-2 bg-slate-200 rounded-xl text-black hover:opacity-70 transition"
                aria-label="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
