const {
  formattedColumns,
  formattedPlaceholders,
  formattedUpdateColumns,
} = require('../utils/handleQuery');
const connection = require('./connection');

const findAll = async () => {
  const query = 'SELECT * FROM products ORDER BY id;';

  const [products] = await connection.execute(query);
  return products;
};

const findById = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = ?;';
  const [[product]] = await connection.execute(query, [productId]);

  return product;
};

const insert = async (product) => {
  const columns = formattedColumns(product);
  const placeholders = formattedPlaceholders(product);
  const query = `INSERT INTO products (${columns}) VALUE (${placeholders})`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);

  return insertId;
};

const update = async (productId, dataToUpdate) => {
  const columns = formattedUpdateColumns(dataToUpdate);

  const query = `UPDATE products SET ${columns} WHERE id = ?;`;

  const [result] = await connection.execute(query, [...Object.values(dataToUpdate), productId]);
  return result;
};
const remove = async (productId) => {
  const query = 'DELETE FROM products WHERE id = ?';

  const [result] = await connection.execute(query, [productId]);
  console.log(result);
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};