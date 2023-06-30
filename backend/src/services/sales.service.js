const { salesModel } = require('../models');

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

const createSale = async (sale) => {
  const insertId = await salesModel.insertSale();
  const newSale = await salesModel.insertProductsOnSale(insertId, sale);
  return { status: 'CREATED', data: newSale };
};

module.exports = {
  findAll,
  findById,
  createSale,
};