import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { cardProps, updCardProps, updPosProps } from '../../types/types';

export const kanbanInstance = axios.create({
  baseURL: 'https://kanban-board-server-ks0g.onrender.com/api',
});

export const fetchBoards = createAsyncThunk(
  'fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await kanbanInstance.get(`/boards`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchBoardById = createAsyncThunk(
  'fetchBoardById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await kanbanInstance.get(`/boards/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createBoard = createAsyncThunk(
  'createBoard',
  async (body: { name: string }, { rejectWithValue }) => {
    try {
      const { data } = await kanbanInstance.post(`/boards`, body);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteBoardById = createAsyncThunk(
  'deleteBoard',
  async (id: string, { rejectWithValue }) => {
    try {
      await kanbanInstance.delete(`/boards/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateBoardName = createAsyncThunk(
  'updateBoardName',
  async (body: { id: string; name: string }, { rejectWithValue }) => {
    const { id, name } = body;
    try {
      const { data } = await kanbanInstance.patch(`/boards/${id}`, { name });
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createCard = createAsyncThunk(
  'addCard',
  async (body: cardProps, { rejectWithValue }) => {
    try {
      const { data } = await kanbanInstance.post(`/cards`, body);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateCard = createAsyncThunk(
  'updateCard',
  async (body: updCardProps, { rejectWithValue }) => {
    const { id, title, content } = body;
    try {
      const { data } = await kanbanInstance.put(`/cards/${id}`, {
        title,
        content,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteCard = createAsyncThunk(
  'deleteCard',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await kanbanInstance.delete(`/cards/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updatePosition = createAsyncThunk(
  'updatePosition',
  async (body: updPosProps, { rejectWithValue }) => {
    try {
      const { data } = await kanbanInstance.put(`/cards/updatePosition`, body);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
