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

const updateProduct = async (productId, data) => {
  const error = schema.validateAddProduct(data);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const productExists = await productsModel.findById(productId);
  if (!productExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  await productsModel.update(productId, data);
  const productUpdated = await productsModel.findById(productId);

  return { status: 'SUCCESSFUL', data: productUpdated };
}; 

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};