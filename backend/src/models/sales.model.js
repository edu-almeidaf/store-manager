const camelize = require('camelize');
const connection = require('./connection');
const { formattedColumns, formattedPlaceholders } = require('../utils/handleQuery');

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

const insertSale = async () => {
  const query = 'INSERT INTO sales (date) VALUES (CURRENT_TIMESTAMP)';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

const insertProductsOnSale = async (id, sale) => {
  let insertPromises = [];

  insertPromises = sale.map(({ productId, quantity }) => {
    const saleField = { saleId: id, productId, quantity };
    const columns = formattedColumns(saleField);
    const placeholders = formattedPlaceholders(saleField);
    const query = `INSERT INTO sales_products (${columns}) VALUES (${placeholders})`;

    return connection.execute(query, [...Object.values(saleField)]);
  });

  await Promise.all(insertPromises);

  const saleSuccessful = await findById(id);

  if (saleSuccessful.length > 0) {
    return { id, itemsSold: sale };
  }
};

module.exports = {
  findAll,
  findById,
  insertSale,
  insertProductsOnSale,
};