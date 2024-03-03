import { Draggable } from '@hello-pangea/dnd';
import { RxPencil2, RxCross1 } from 'react-icons/rx';
import { FiCheck, FiTrash2 } from 'react-icons/fi';
import { Card } from '../types/types';
import { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { deleteCard, updateCard } from '../redux/kanban/operations';

export interface CardProps {
  card: Card;
  index: number;
}

export default function TaskCard({ card, index }: CardProps) {
  const [cardTitle, setCardTitle] = useState(card.title);
  const [cardContent, setCardContent] = useState(card.content);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();

  function removeItemById(id: string) {
    dispatch(deleteCard(id));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(
      updateCard({ id: card._id, title: cardTitle, content: cardContent })
    );
    setIsEditing(false);
  }

  return (
    <>
      {isEditing ? (
        <div className="card w-full max-w-80 bg-base-100 shadow-xl">
          <form
            id="card-edit"
            onSubmit={onSubmit}
            className="card-body p-4 max-h-56"
          >
            <input
              autoFocus
              onChange={e => setCardTitle(e.target.value.trim())}
              defaultValue={cardTitle}
              placeholder="Title"
              className="input input-bordered card-title p-0.5 text-base font-medium indent-2 "
            />
            <textarea
              onChange={e => setCardContent(e.target.value.trim())}
              placeholder="Content"
              className="textarea textarea-bordered my-auto h-[90%] w-full overflow-auto whitespace-pre-wrap resize-none "
              defaultValue={cardContent}
            />

            <div className="card-actions justify-end">
              <button
                type="submit"
                className="p-2 bg-slate-200 rounded-xl text-black hover:opacity-70 transition"
                title="Confirm"
                aria-label="Confirm"
              >
                <FiCheck />
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 bg-slate-200 rounded-xl text-black hover:opacity-70 transition"
                title="Cancel"
                aria-label="Cancel"
              >
                <RxCross1 />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Draggable key={card._id} draggableId={`${card._id}`} index={index}>
          {provided => (
            <div
              className="card w-full max-w-80 bg-base-100 shadow-xl"
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <div className="card-body p-4 max-h-56 ">
                <p className="card-title p-0.5 text-base font-medium ">
                  {cardTitle}
                </p>
                <p className="my-auto h-[90%] w-full overflow-auto whitespace-pre-wrap ">
                  {cardContent}
                </p>

                <div className="card-actions justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-slate-200 rounded-xl text-black hover:opacity-70 transition"
                    title="Edit"
                    aria-label="Edit"
                  >
                    <RxPencil2 />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItemById(card._id)}
                    className="p-2 bg-slate-200 rounded-xl text-black hover:opacity-70 transition"
                    title="Delete"
                    aria-label="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
}
