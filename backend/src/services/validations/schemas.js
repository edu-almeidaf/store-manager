const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const fieldSaleSchema = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required()
    .label('quantity'),
});

const addSaleSchema = Joi.array().items(fieldSaleSchema);

module.exports = {
  addProductSchema,
  addSaleSchema,
};