const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateAddSale, validateUpdateSale } = require('../middlewares/validateSalesFields');

route.get('/', salesController.findAll);
route.get('/:id', salesController.findById);
route.post('/', validateAddSale, salesController.createSale);
route.put(
  '/:saleId/products/:productId/quantity',
  validateUpdateSale,
  salesController.updateSale,
);
route.delete('/:id', salesController.deleteSale);

module.exports = route;