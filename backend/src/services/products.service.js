const { productsModel } = require('../models');
const schema = require('./validations/validationInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);

  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'SUCCESSFUL', data: product };
};

const createProduct = async (product) => {
  const error = schema.validateAddProduct(product);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }
  const insertId = await productsModel.insert(product);
  const newProduct = await productsModel.findById(insertId);
  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};