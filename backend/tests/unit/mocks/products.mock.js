const productsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const productFromModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const productsFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const productFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const productIdFromDB = { insertId: 4 };
const productIdFromModel = 4;

const newProductFromModel = { id: 4, name: 'Armadura do Homem de Ferro' };

const productFromServiceCreated = {
  status: 'CREATED',
  data: newProductFromModel,
};

const updateStatusProductFromDB = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 0  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0,
};

const updatedProductFromModel = {
  id: 1,
  name: 'Jóia do tempo',
};

const productFromServiceUpdated = {
  status: 'SUCCESSFUL',
  data: updatedProductFromModel,
};

const productsByQuery = [
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const productsByQueryService = {
  status: 'SUCCESSFUL',
  data: productsByQuery,
};

module.exports = {
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  productsFromServiceSuccessful,
  productFromServiceSuccessful,
  productIdFromDB,
  productIdFromModel,
  newProductFromModel,
  productFromServiceCreated,
  updateStatusProductFromDB,
  updatedProductFromModel,
  productFromServiceUpdated,
  productsByQuery,
  productsByQueryService,
};