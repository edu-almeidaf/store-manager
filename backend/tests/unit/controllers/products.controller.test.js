const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const {
  productsFromServiceSuccessful,
  productsFromModel,
  productFromServiceSuccessful,
  productFromModel,
  productFromServiceCreated,
  newProductFromModel,
} = require('../mocks/products.mock');
const { productsController } = require('../../../src/controllers');
const { validateProductsFields } = require('../../../src/middlewares/validateProductsFields');

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

  it('Inserindo product com sucesso - status 201', async function () {
    sinon.stub(productsService, 'createProduct').resolves(productFromServiceCreated);
    const next = sinon.stub().returns();

    const req = {
      params: {},
      body: { name: 'Armadura do Homem de Ferro' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateProductsFields(req, res, next);
    expect(next).to.have.been.calledWith();
    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductFromModel);
  });

  it('Não é possível criar um produto sem o campo name - status 400', async function () {
    const next = sinon.stub().returns();
    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    validateProductsFields(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  afterEach(function () {
    sinon.restore();
  });
});