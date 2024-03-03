export default function NoBoard() {
  return (
    <div className="flex flex-col items-center gap-10 mt-24">
      <h1 className="text-5xl">You haven't created a board yet</h1>
      <p className="text-3xl">You can create a new one or load existing one</p>
      <button
        type="button"
        className="btn p-6 h-auto max-w-max text-xl text-textColor "
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
