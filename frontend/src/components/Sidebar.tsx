import { useSelector } from 'react-redux';
import { selectBoards } from '../redux/kanban/selectors';
import BoardCard from './BoardCard';

export default function Sidebar() {
  const boards = useSelector(selectBoards);

  return (
    <div className="flex flex-col justify-start w-[250px] h-screen border-r border-solid border-textColor ">
      <div className="w-full p-5 text-center border-b border-solid border-textColor  ">
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
      <div className="p-5 overflow-y-auto">
        <ul className="flex flex-col gap-4 ">
          {boards?.length !== 0 &&
            boards?.map((board) => (
              <BoardCard key={board._id} board={board}></BoardCard>
            ))}
        </ul>
      </div>
    </div>
  );
}
