import { createSlice, isAnyOf } from '@reduxjs/toolkit';
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
  loading: false,
  error: null,
};

export const slice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchBoards.fulfilled, (state, { payload }) => {
        state.boards = payload;
      })
      .addCase(createBoard.fulfilled, (state, { payload }) => {
        state.boards.push(payload);
      })
      .addCase(deleteBoardById.fulfilled, (state, { payload }) => {
        state.boards = state.boards.filter(({ _id }) => _id !== payload);
        if (state.board && state.board._id === payload) {
          state.board = null;
        }
      })
      .addCase(fetchBoardById.rejected, state => {
        state.board = null;
      })
      .addMatcher(
        isAnyOf(
          fetchBoardById.fulfilled,
          createBoard.fulfilled,
          createCard.fulfilled,
          deleteCard.fulfilled,
          updatePosition.fulfilled
        ),
        (state, { payload }) => {
          state.board = payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchBoardById.pending,
          createBoard.pending,
          createCard.pending,
          deleteCard.pending,
          updatePosition.pending
        ),
        state => {
          state.loading = true;
        }
      ),
});

export const kanbanReducer = slice.reducer;
