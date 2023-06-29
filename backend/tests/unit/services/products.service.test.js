const { expect } = require('chai');
const sinon = require('sinon');
const {
  productsFromModel, productFromModel,
} = require('../mocks/products.mock');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

describe('Realizando testes - PRODUCTS Service:', function () {
  it('Recuperando products com sucesso', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromModel);

    const responseData = [...productsFromModel];

    const responseService = await productsService.findAll();

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.lengthOf(3);
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Recuperando product pelo id com sucesso', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromModel);

    const responseData = { ...productFromModel };

    const inputData = 1;
    const responseService = await productsService.findById(inputData);

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Ao passar um id inválido, é retornado um status not found', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const inputData = 999999;
    const responseService = await productsService.findById(inputData);

    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data.message).to.be.a('string');
    expect(responseService.data.message).to.be.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});