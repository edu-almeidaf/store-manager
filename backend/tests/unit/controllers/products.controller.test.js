const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const {
  productsFromServiceSuccessful,
  productsFromModel,
  productFromServiceSuccessful,
  productFromModel,
} = require('../mocks/products.mock');
const { productsController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - PRODUCTS CONTROLLER:', function () {
  it('Simulando um erro no servidor - Status 500', async function () {
    sinon.stub(productsService, 'findAll')
      .resolves({ status: undefined, data: undefined });
    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(500);
  });

  it('Recuperando produtos com sucesso - Status 200', async function () {
    sinon.stub(productsService, 'findAll')
      .resolves(productsFromServiceSuccessful);
    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const responseData = [...productsFromModel];

    await productsController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(responseData);
  });

  it('Recuperando um product pelo id com sucesso - Status 200', async function () {
    sinon.stub(productsService, 'findById')
      .resolves(productFromServiceSuccessful);
    const req = {
      params: { id: 1 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});