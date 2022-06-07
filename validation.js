import Joi from "joi";

export const registrationsValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });
    return schema.validate(data);
}

export const loginValidation = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(3)
        .max(30)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(data);
};

