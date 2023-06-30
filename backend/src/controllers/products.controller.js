const { productsService } = require('../services');
const handleStatusHTTP = require('../utils/handleStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await productsService.findAll();
  return res.status(handleStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findById(id);
  return res.status(handleStatusHTTP(status)).json(data);
};

const createProduct = async (req, res) => {
  const { status, data } = await productsService.createProduct(req.body);
  return res.status(handleStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  createProduct,
};