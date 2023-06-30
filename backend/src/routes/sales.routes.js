const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateAddSale } = require('../middlewares/validateSalesFields');

route.get('/', salesController.findAll);
route.get('/:id', salesController.findById);
route.post('/', validateAddSale, salesController.createSale);

module.exports = route;