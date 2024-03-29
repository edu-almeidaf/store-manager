const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateProductsFields } = require('../middlewares/validateProductsFields');

route.get('/', productsController.findAll);
route.get('/search', productsController.findByQuery);
route.get('/:id', productsController.findById);
route.post('/', validateProductsFields, productsController.createProduct);
route.put('/:id', validateProductsFields, productsController.updateProduct);
route.delete('/:id', productsController.deleteProduct);

module.exports = route;