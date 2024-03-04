import { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { fetchBoardById } from '../redux/kanban/operations';

export default function Header() {
  const [boardId, setBoardId] = useState('');

  const dispatch = useAppDispatch();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = (
      e.currentTarget.elements.namedItem('board_id') as HTMLInputElement
    ).value.trim();

    if (inputValue === '') {
      e.currentTarget.reset();
      setBoardId('');
      return;
    }
    dispatch(fetchBoardById(boardId));
    e.currentTarget.reset();
  }

  return (
    <div className="flex justify-center gap-3 mb-5">
      <form onSubmit={onSubmit} className="min-w-72 w-[500px] flex gap-4 ">
        <input
          type="text"
          name="board_id"
          placeholder="Enter a board ID here..."
          className="input input-bordered w-full"
          onChange={e => setBoardId(e.currentTarget.value.trim())}
        />
        <button
          type="submit"
          className="btn text-textColor"
          aria-label="Load a board"
        >
          Load
        </button>
      </form>
      <button
        type="button"
        className="btn text-textColor"
        onClick={() => {
          const modal = document.getElementById(
            'create_modal'
          ) as HTMLDialogElement;
          modal.showModal();
        }}
        aria-label="Create a board"
      >
        Create a new board
      </button>
    </div>
  );
}
