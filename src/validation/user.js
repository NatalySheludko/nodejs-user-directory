import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit}',
    'string.max': 'Name should be at most {#limit}',
  }),
  email: Joi.string().email().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email is not valid',
  }),
  password: Joi.string().messages({
    'string.base': 'Name should be a string',
	}),
});
