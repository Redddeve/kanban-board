export type Card = {
  id: number;
  title: string;
  content: string;
  status: 'todo' | 'inProgress' | 'done';
  index: number;
};

export type Board = {
  id: number;
  name: string;
};

export interface KanbanState {
  boards: Board[];
  board: null | Board;
  todo: Card[];
  inProgress: Card[];
  done: Card[];
  loading: boolean;
  error: null | string;
}
