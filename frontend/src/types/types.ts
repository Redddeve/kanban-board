export type Card = {
  _id: string;
  section: string;
  title: string;
  content: string;
  position: number;
};

export type Column = {
  id: string;
  cards: Card[];
  title: string;
};

export type Board = {
  _id: string;
  name: string;
  sections?: {
    todo: Column;
    inProgress: Column;
    done: Column;
  };
};

export interface KanbanState {
  boards: Board[];
  board: null | Board;
  loading: boolean;
  error: null | string;
}

export interface cardProps {
  boardId: string;
  sectionId?: string;
  cardId?: string;
}

export interface updCardProps {
  id: string;
  title: string;
  content: string;
}

export interface updPosProps {
  boardId: string;
  sourceList: Card[];
  destList: Card[];
  sourceColId: string;
  destColId: string;
}
