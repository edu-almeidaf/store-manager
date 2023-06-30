const { addProductSchema, addSaleSchema } = require('./schemas');

const validateAddProduct = (data) => {
  const { error } = addProductSchema.validate(data);
  if (error) {
    return { status: 'INVALID_VALUE', message: error.message };
  }
};

const validateAddSale = (data) => {
  const { error } = addSaleSchema.validate(data);
  if (error) {
    return { status: 'INVALID_VALUE', message: error.message };
  }
};

module.exports = {
  validateAddProduct,
  validateAddSale,
};