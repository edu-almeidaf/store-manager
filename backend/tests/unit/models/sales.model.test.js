const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const {
  salesFromModel,
  salesFromDB,
  saleFromDB,
  saleFromModel,
  saleIdFromDB,
  saleIdFromModel,
  // newSaleFromModel,
} = require('../mocks/sales.mock');

describe('Realizando testes - SALES MODEL:', function () {
  it('Recuperando sales com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);

    const sales = await salesModel.findAll();

    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(3);
    expect(sales).to.be.deep.equal(salesFromModel);
  });

  it('Recuperando sale por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);

    const inputData = 1;
    const sale = await salesModel.findById(inputData);

    expect(sale).to.be.an('array');
    expect(sale).to.have.lengthOf(2);
    expect(sale).to.be.deep.equal(saleFromModel);
  });

  it('Criando sale com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([saleIdFromDB]);

    const result = await salesModel.insertSale();

    expect(result).to.be.equal(saleIdFromModel);
  });

  // it('Inserindo sale com sucesso', async function () {
  //   const saleId = 3;
  //   const saleData = [
  //     { productId: 1, quantity: 1 },
  //     { productId: 2, quantity: 5 },
  //   ];
  //   const expectedQuery = 'INSERT INTO sales_products (saleId, productId, quantity) VALUES (?, ?, ?)';
  //   const expectedValues = [[saleId, 1, 1], [saleId, 2, 5]];

  //   const executeStub = sinon.stub(connection, 'execute').resolves();
  //   sinon.stub(salesModel, 'findById').resolves(saleFromModel);

  //   const result = await salesModel.insertProductsOnSale(saleId, saleData);

  //   expect(executeStub).to.have.been.calledWithExactly(expectedQuery, sinon.match(expectedValues));
  //   expect(result).to.deep.equal(newSaleFromModel);
  // });

  // it('Inserindo products na sale com sucesso', async function () {
  //   const saleId = 3;
  //   const saleData = [
  //     { productId: 1, quantity: 1 },
  //     { productId: 2, quantity: 5 },
  //   ];

  //   sinon.stub(connection, 'execute')
  //     .onFirstCall()
  //     .callsFake((query, values) => {
  //       expect(query).to.includes('INSERT INTO sales_products');
  //       expect(values).to.deep.equal([saleId, 1, 1]);
  //       return Promise.resolve();
  //     })
  //     .onSecondCall()
  //     .callsFake((query, values) => {
  //       expect(query).to.includes('INSERT INTO sales_products');
  //       expect(values).to.deep.equal([saleId, 2, 5]);
  //       return Promise.resolve();
  //     });
  //   sinon.stub(salesModel, 'findById').resolves(saleFromModel);

  //   const result = await salesModel.insertProductsOnSale(saleId, saleData);
  //   expect(result).to.deep.equal(newSaleFromModel);
  // });

  afterEach(function () {
    sinon.restore();
  });
});