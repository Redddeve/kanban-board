import { RxPencil2 } from 'react-icons/rx';
import { Board } from '../types/types';
import { FiTrash2 } from 'react-icons/fi';
import { useAppDispatch } from '../hooks/hooks';
import {
  deleteBoardById,
  fetchBoardById,
  updateBoardName,
} from '../redux/kanban/operations';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBoard } from '../redux/kanban/selectors';
interface BoardCardProps {
  board: Board;
}

export default function BoardCard({ board }: BoardCardProps) {
  const [boardName, setBoardName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();

  const currentBoard = useSelector(selectBoard);

  useEffect(() => {
    setBoardName(board.name);
  }, [board.name]);

  function updateName(id: string, name: string) {
    if (boardName === '' || boardName === board.name) return;

    dispatch(updateBoardName({ id, name }));
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.currentTarget.value.trim();
    setBoardName(inputValue);
  }

  function deleteById(id: string) {
    dispatch(deleteBoardById(id));
  }
  function onClick(id: string) {
    if (currentBoard?._id !== id) {
      dispatch(fetchBoardById(id));
    }
  }

  return (
    <div className="card w-full max-w-80 min-h-28 bg-neutral shadow-xl">
      {isEditing ? (
        <div className="card-body p-4 max-h-56 h-[130px]">
          <input
            autoFocus
            onBlur={() => {
              updateName(board._id, boardName);
              setIsEditing(false);
            }}
            onChange={onInputChange}
            defaultValue={boardName}
            className="input input-bordered card-title p-0.5 h-7 text-base font-medium "
          />
          <p className="my-auto mb-2 text-xs text-neutral-content">
            ID: {board._id}
          </p>
        </div>
      ) : (
        <div
          className="card-body p-4 max-h-56 cursor-pointer"
          onClick={() => onClick(board._id)}
        >
          <p className="card-title p-0.5 text-base font-medium ">{boardName}</p>
          <p className="my-auto mb-2 text-xs text-neutral-content">
            ID: {board._id}
          </p>
          <div className="card-actions justify-end ">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="p-2 bg-slate-200 rounded-xl text-black hover:opacity-70 transition"
              aria-label="Edit board name"
            >
              <RxPencil2 />
            </button>
            <button
              type="button"
              onClick={() => deleteById(board._id)}
              className="p-2 bg-slate-200 rounded-xl text-black hover:opacity-70 transition"
              aria-label="Delete board"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
