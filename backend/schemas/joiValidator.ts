import Joi from 'joi';

export const addBoardSchema = Joi.object({
  name: Joi.string().required(),
});

export const updateBoardNameSchema = Joi.object({
  name: Joi.string().required(),
});

export const addCardSchema = Joi.object({
  boardId: Joi.string().required(),
  sectionId: Joi.string().required(),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

export const updatePosSchema = Joi.object({
  boardId: Joi.string().required(),
  sourceColId: Joi.string().required(),
  destColId: Joi.string().required(),
  sourceList: Joi.array().required(),
  destList: Joi.array().required(),
});
