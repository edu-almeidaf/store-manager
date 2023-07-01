const {
  salesModel,
  productsModel,
} = require('../models');
const schema = require('./validations/validationInputValues');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);

  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: 'SUCCESSFUL', data: sale };
};

const verifyProductId = (allProducts, sale) => {
  const allproductsId = allProducts.map((product) => product.id);
  const allSaleProductsId = sale.map((product) => product.productId);
  const validateId = allSaleProductsId.every((product) => allproductsId.includes(product));

  return validateId;
};

const createSale = async (sale) => {
  const error = schema.validateAddSale(sale);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }
  const allProducts = await productsModel.findAll();
  const isProductIdExists = verifyProductId(allProducts, sale);
  if (!isProductIdExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const insertId = await salesModel.insertSale();
  const newSale = await salesModel.insertProductsOnSale(insertId, sale);
  return { status: 'CREATED', data: newSale };
};

const verifyProductIdUpdate = (productId, sale) => {
  const isProductExists = sale.some((product) => product.productId === productId);
  return isProductExists;
};

const updateSale = async ({ saleId, productId, quantity }) => {
  const error = schema.validateUpdateSale(quantity);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const findSale = await salesModel.findById(saleId);
  if (findSale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  const isProductIdExists = verifyProductIdUpdate(Number(productId), findSale);
  if (!isProductIdExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
  }

  await salesModel.updateSale({ saleId, productId, quantity });

  const updatedSale = await salesModel.findUpdatedSaleById(saleId);
  const updatedProductSale = updatedSale.find((product) => product.productId === Number(productId));

  return { status: 'SUCCESSFUL', data: updatedProductSale };
};

const deleteSale = async (productId) => {
  const saleExists = await salesModel.findById(productId);
  if (!saleExists || saleExists.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  await salesModel.removeSale(productId);
  await salesModel.removeSaleProducts(productId);

  return { status: 'DELETED' };
};

module.exports = {
  findAll,
  findById,
  createSale,
  updateSale,
  deleteSale,
};