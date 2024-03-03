import { createSlice } from '@reduxjs/toolkit';
import { KanbanState } from '../../types/types';
import {
  createBoard,
  createCard,
  deleteBoardById,
  deleteCard,
  fetchBoardById,
  fetchBoards,
  updatePosition,
} from './operations';

const initialState: KanbanState = {
  boards: [],
  board: null,
  sections: null,
  loading: false,
  error: null,
};

export const slice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchBoards.fulfilled, (state, { payload }) => {
        state.boards = payload;
      })
      .addCase(fetchBoardById.fulfilled, (state, { payload }) => {
        state.board = payload;
        state.sections = payload.sections;
      })
      .addCase(createBoard.fulfilled, (state, { payload }) => {
        state.boards.push(payload);
        state.board = payload;
        state.sections = payload.sections;
      })
      .addCase(deleteBoardById.fulfilled, (state, { payload }) => {
        state.boards = state.boards.filter(({ _id }) => _id !== payload);
        if (state.board && state.board._id === payload) {
          state.board = null;
          state.sections = null;
        }
      })
      .addCase(createCard.fulfilled, (state, { payload }) => {
        state.board = payload;
        state.sections = payload.sections;
      })
      .addCase(deleteCard.fulfilled, (state, { payload }) => {
        state.board = payload;
        state.sections = payload.sections;
      })
      .addCase(updatePosition.fulfilled, (state, { payload }) => {
        state.board = payload;
        state.sections = payload.sections;
      })
      .addCase(fetchBoardById.rejected, (state) => {
        state.board = null;
      }),
});

export const kanbanReducer = slice.reducer;
