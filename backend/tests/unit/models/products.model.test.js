const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const {
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  productIdFromDB,
  productIdFromModel,
  updateStatusProductFromDB,
} = require('../mocks/products.mock');
const { productsModel } = require('../../../src/models');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  it('Recuperando products com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productsModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Recuperando product por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);

    const inputData = 1;
    const product = await productsModel.findById(inputData);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productFromModel);
  });

  it('Inserindo product com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productIdFromDB]);

    const inputData = { name: 'Armadura do Homem de Ferro' };
    const result = await productsModel.insert(inputData);
    expect(result).to.be.equal(productIdFromModel);
  });

  it('Atualizando product com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([updateStatusProductFromDB]);

    const inputId = 1;
    const inputData = { name: 'Armadura do Homem de Ferro' };
    const result = await productsModel.update(inputId, inputData);
    expect(result.affectedRows).to.be.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});