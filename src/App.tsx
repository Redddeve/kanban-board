import KanbanBoard from './components/KanbanBoard';
import Header from './components/Header';
import NoBoard from './components/NoBoard';
import Modal from './components/Modal';
import { useSelector } from 'react-redux';
import { selectBoard } from './redux/kanban/selectors';
import { useAppDispatch } from './hooks/hooks';
import { useEffect } from 'react';
import { fetchBoards } from './redux/kanban/operations';
import Sidebar from './components/Sidebar';

export default function App() {
  const board = useSelector(selectBoard);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  return (
    <div className="flex items-stretch ">
      <Sidebar />
      <main className="my-0 mx-auto p-5 min-w-[335px] max-width-[1440px] min-h-[500px] ">
        <Header />
        {board ? <KanbanBoard dashboard={board} /> : <NoBoard />}
      </main>
      <Modal />
    </div>
  );
}
