const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesFromModel, salesFromDB, saleFromDB, saleFromModel } = require('../mocks/sales.mock');

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

  afterEach(function () {
    sinon.restore();
  });
});