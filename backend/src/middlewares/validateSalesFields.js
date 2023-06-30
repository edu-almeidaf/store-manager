const verifyRequiredFields = require('../utils/verifyRequiredFields');

const validateAddSale = (req, res, next) => {
  const newSale = req.body;

  if (!Array.isArray(newSale)) {
    return res.status(422).json({ message: 'You must to pass an array' });
  }

  const newSaleRequiredFields = ['productId', 'quantity'];

  for (let i = 0; i < newSale.length; i += 1) {
    const fieldSale = newSale[i];
    const error = verifyRequiredFields(fieldSale, newSaleRequiredFields);
    if (error) return res.status(400).json({ message: error });
  }

  return next();
};

module.exports = {
  validateAddSale,
};