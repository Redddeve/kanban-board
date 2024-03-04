import { RootState } from './../store';

export const selectBoards = (state: RootState) => state.kanban.boards;

export const selectBoard = (state: RootState) => state.kanban.board;

export const selectSections = (state: RootState) => state.kanban.sections;

export const selectLoading = (state: RootState) => state.kanban.loading;

export const selectError = (state: RootState) => state.kanban.error;
