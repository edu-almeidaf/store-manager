const { salesService } = require('../services');
const handleStatusHTTP = require('../utils/handleStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await salesService.findAll();
  return res.status(handleStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findById(id);
  return res.status(handleStatusHTTP(status)).json(data);
};

const createSale = async (req, res) => {
  const { status, data } = await salesService.createSale(req.body);
  return res.status(handleStatusHTTP(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.deleteSale(id);
  if (data) {
    return res.status(handleStatusHTTP(status)).json(data);
  }
  return res.status(handleStatusHTTP(status)).end();
};

module.exports = {
  findAll,
  findById,
  createSale,
  deleteSale,
};