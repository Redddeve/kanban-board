import Joi from 'joi';

export const addBoardSchema = Joi.object({
  name: Joi.string().required(),
});

export const updateBoardSchema = Joi.object({
  name: Joi.string().required(),
});
