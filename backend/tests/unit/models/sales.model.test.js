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
  updateSaleFromModel,
  affectedRowsMock,
} = require('../mocks/sales.mock');
const { updateStatusProductFromDB } = require('../mocks/products.mock');

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

  it('Inserindo products na sale com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([affectedRowsMock]);

    const inputData = {
      saleId: 3,
      productId: 1,
      quantity: 10,
    };
    
    const result = await salesModel.insertProductsOnSale(inputData);

    expect(result.affectedRows).to.be.equal(1);
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

  it('Removendo sale com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([updateStatusProductFromDB]);

    const inputId = 1;
    const result = await salesModel.removeSale(inputId);
    expect(result.affectedRows).to.be.equal(1);
  });

  it('Removendo products da sale com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([updateStatusProductFromDB]);

    const inputId = 1;
    const result = await salesModel.removeSaleProducts(inputId);
    expect(result.affectedRows).to.be.equal(1);
  });

  it('Atualizando sale com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([updateStatusProductFromDB]);

    const inputId = {
      saleId: 1,
      productId: 1,
      quantity: 20,
    };
    const result = await salesModel.updateSale(inputId);
    expect(result.affectedRows).to.be.equal(1);
  });

  it('Buscando a sale atualizada com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([updateSaleFromModel]);

    const inputId = {
      saleId: 1,
    };

    const response = [...updateSaleFromModel];

    const result = await salesModel.findUpdatedSaleById(inputId);
    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(2);
    expect(result).to.be.deep.equal(response);
  });

  afterEach(function () {
    sinon.restore();
  });
});