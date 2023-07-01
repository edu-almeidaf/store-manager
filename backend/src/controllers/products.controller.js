const { productsService } = require('../services');
const handleStatusHTTP = require('../utils/handleStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await productsService.findAll();
  return res.status(handleStatusHTTP(status)).json(data);
};

const findByQuery = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await productsService.findByQuery(q);
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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.updateProduct(id, req.body);
  
  return res.status(handleStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.deleteProduct(id);
  if (data) {
    return res.status(handleStatusHTTP(status)).json(data);
  }
  return res.status(handleStatusHTTP(status)).end();
};

module.exports = {
  findAll,
  findById,
  findByQuery,
  createProduct,
  updateProduct,
  deleteProduct,
};