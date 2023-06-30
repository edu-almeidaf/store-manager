const snakeize = require('snakeize');

const formattedColumns = (object) => (
  Object.keys(snakeize(object)).join(', ')
);

const formattedPlaceholders = (object) => (
  Object.keys(object).map((_key) => '?').join(', ')
);

const formattedUpdateColumns = (object) => (
  Object.keys(snakeize(object))
    .map((key) => `${key}=?`).join(', ')
);

module.exports = {
  formattedColumns,
  formattedPlaceholders,
  formattedUpdateColumns,
};