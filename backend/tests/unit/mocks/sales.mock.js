const salesFromDB = [
  {
    saleId: 1,
    date: '2023-06-29T22:23:23.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-06-29T22:23:24.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-06-29T22:23:25.000Z',
    productId: 3,
    quantity: 15,
  },
];

const salesFromModel = [
  {
    saleId: 1,
    date: '2023-06-29T22:23:23.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-06-29T22:23:24.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-06-29T22:23:25.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleFromDB = [
  {
    date: '2023-06-29T22:51:59.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-06-29T22:51:59.000Z',
    productId: 2,
    quantity: 10,
  },
];

const saleFromModel = [
  {
    date: '2023-06-29T22:51:59.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-06-29T22:51:59.000Z',
    productId: 2,
    quantity: 10,
  },
];

const salesFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: salesFromModel,
};

const saleFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: saleFromModel,
};

const saleIdFromDB = { insertId: 3 };
const saleIdFromModel = 3;

const newSaleFromModel = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

const saleFromServiceCreated = {
  status: 'CREATED',
  data: newSaleFromModel,
};

module.exports = {
  salesFromDB,
  salesFromModel,
  saleFromDB,
  saleFromModel,
  salesFromServiceSuccessful,
  saleFromServiceSuccessful,
  saleIdFromDB,
  saleIdFromModel,
  newSaleFromModel,
  saleFromServiceCreated,
};