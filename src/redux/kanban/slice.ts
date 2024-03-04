import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { KanbanState } from '../../types/types';
import {
  createBoard,
  createCard,
  deleteBoardById,
  deleteCard,
  fetchBoardById,
  fetchBoards,
  updateCard,
  updatePosition,
} from './operations';

const initialState: KanbanState = {
  boards: [],
  board: null,
  sections: [],
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
      .addCase(createCard.fulfilled, (state, { payload }) => {
        const index = state.sections.findIndex(
          el => el._id === payload.section
        );
        state.sections[index].cards.push(payload);
      })
      .addCase(updateCard.fulfilled, (state, { payload }) => {
        const index = state.sections.findIndex(
          el => el._id === payload.section
        );
        const cardIdx = state.sections[index].cards.findIndex(
          el => el._id === payload._id
        );
        state.sections[index].cards.splice(cardIdx, 1, payload);
      })
      .addCase(deleteCard.fulfilled, (state, { payload }) => {
        const index = state.sections.findIndex(
          el => el._id === payload.section
        );
        const cardIdx = state.sections[index].cards.findIndex(
          el => el._id === payload._id
        );
        state.sections[index].cards.splice(cardIdx, 1);
      })
      .addCase(fetchBoardById.rejected, state => {
        state.board = null;
      })
      .addMatcher(
        isAnyOf(fetchBoardById.fulfilled, createBoard.fulfilled),
        (state, { payload }) => {
          state.board = payload;
          state.sections = payload.sections;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchBoards.pending,
          fetchBoardById.pending,
          createBoard.pending,
          deleteBoardById.pending,
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
