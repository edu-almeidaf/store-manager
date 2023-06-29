const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const query = `SELECT
    SP.sale_id,
    S.date,
    SP.product_id,
    SP.quantity
  FROM sales_products AS SP
  INNER JOIN sales AS S
  ON SP.sale_id = S.id
  ORDER BY sale_id, product_id;`;

  const [sales] = await connection.execute(query);

  return camelize(sales);
};

const findById = async (saleId) => {
  const query = `SELECT
    S.date,
    SP.product_id,
    SP.quantity
  FROM sales AS S
  INNER JOIN sales_products AS SP
  ON SP.sale_id = S.id
  WHERE sale_id = ?;`;
  const [sale] = await connection.execute(query, [saleId]);

  return camelize(sale);
};

module.exports = {
  findAll,
  findById,
};