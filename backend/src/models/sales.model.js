const camelize = require('camelize');
const connection = require('./connection');
const {
  formattedColumns,
  formattedPlaceholders,
} = require('../utils/handleQuery');

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

const findUpdatedSaleById = async (saleId) => {
  const query = `SELECT
    S.date,
    SP.product_id,
    SP.quantity,
    SP.sale_id
  FROM sales AS S
  INNER JOIN sales_products AS SP
  ON SP.sale_id = S.id
  WHERE sale_id = ?
  ORDER BY S.id, SP.product_id;`;
  const [sale] = await connection.execute(query, [saleId]);

  return camelize(sale);
};

const insertSale = async () => {
  const query = 'INSERT INTO sales (date) VALUES (CURRENT_TIMESTAMP)';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

const insertProductsOnSale = async (saleField) => {
  const columns = formattedColumns(saleField);
  const placeholders = formattedPlaceholders(saleField);
  const query = `INSERT INTO sales_products (${columns}) VALUES (${placeholders})`;

  const [result] = await connection.execute(query, [...Object.values(saleField)]);

  return result;
};

const updateSale = async ({ saleId, productId, quantity }) => {
  const query = `UPDATE sales_products SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`;
  
  const [result] = await connection.execute(query, [quantity, saleId, productId]);

  return result;
};

const removeSale = async (productId) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  const [result] = await connection.execute(query, [productId]);
  return result;
};

const removeSaleProducts = async (productId) => {
  const query = 'DELETE FROM sales_products WHERE sale_id = ?';
  const [result] = await connection.execute(query, [productId]);
  return result;
};

module.exports = {
  findAll,
  findById,
  findUpdatedSaleById,
  insertSale,
  insertProductsOnSale,
  updateSale,
  removeSale,
  removeSaleProducts,
};