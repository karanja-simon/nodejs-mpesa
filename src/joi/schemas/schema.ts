import Joi from 'joi';


export const initPaymentSchema = {
    params: {
        phoneNo: Joi.string().regex(/^[254]\d{11}$/).required(),
        amount: Joi.number().required()
        }
};
