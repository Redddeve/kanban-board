import { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { createBoard, fetchBoardById } from '../redux/kanban/operations';

export default function Modal() {
  const [boardName, setBoardName] = useState('');

  const dispatch = useAppDispatch();

  const modal = document.getElementById('create_modal') as HTMLDialogElement;
  const form = document.getElementById('name-form') as HTMLFormElement;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = (
      e.currentTarget.elements.namedItem('name') as HTMLInputElement
    ).value.trim();

    if (inputValue === '') {
      e.currentTarget.reset();
      setBoardName('');
      return;
    }
    dispatch(createBoard({ name: boardName }))
      .unwrap()
      .then(({ _id }) => {
        dispatch(fetchBoardById(_id));
      })
      .catch(error => console.error(error));
    e.currentTarget.reset();
    modal.close();
  }

  async function onConfirmClick() {
    const inputValue = (
      form.elements.namedItem('name') as HTMLInputElement
    ).value.trim();
    if (inputValue === '') {
      form.reset();
      setBoardName('');
      return;
    }
    dispatch(createBoard({ name: boardName }))
      .unwrap()
      .then(({ _id }) => {
        dispatch(fetchBoardById(_id));
      })
      .catch(error => console.error(error));

    form.reset();
    modal.close();
  }

  return (
    <dialog id="create_modal" className="modal">
      <div className="modal-box w-[400px] flex flex-col items-center gap-4 ">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-semibold text-lg">Creating a new board</h3>
        <form id="name-form" onSubmit={onSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Enter it's name"
            className="input input-bordered w-full max-w-xs"
            onChange={e => setBoardName(e.target.value.trim())}
            autoFocus
            required
          />
        </form>
        <div className="modal-action ">
          <button
            className="btn w-20 text-textColor"
            aria-label="Confirm"
            onClick={onConfirmClick}
          >
            OK
          </button>
          <form method="dialog" className="w-full flex gap-4">
            <button className="btn w-20 text-textColor" aria-label="Cancel">
              Cancel
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
