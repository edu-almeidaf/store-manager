const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const {
  salesFromServiceSuccessful,
  salesFromModel,
  saleFromServiceSuccessful,
  saleFromModel,
  newSaleFromModel,
  saleFromServiceCreated,
} = require('../mocks/sales.mock');
const { salesController } = require('../../../src/controllers');
const { validateAddSale } = require('../../../src/middlewares/validateSalesFields');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - SALES CONTROLLER:', function () {
  it('Recuperando sales com sucesso - Status 200', async function () {
    sinon.stub(salesService, 'findAll')
      .resolves(salesFromServiceSuccessful);
    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const responseData = [...salesFromModel];

    await salesController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(responseData);
  });

  it('Recuperando uma sale pelo id com sucesso - Status 200', async function () {
    sinon.stub(salesService, 'findById')
      .resolves(saleFromServiceSuccessful);
    const req = {
      params: { id: 1 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
  });

  it('Inserindo sale com sucesso - status 201', async function () {
    sinon.stub(salesService, 'createSale').resolves(saleFromServiceCreated);
    const next = sinon.stub().returns();

    const req = {
      params: {},
      body: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateAddSale(req, res, next);
    expect(next).to.have.been.calledWith();
    await salesController.createSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSaleFromModel);
  });

  it('Não é possível cadastrar uma venda sem o campo productId - status 400', async function () {
    const next = sinon.stub().returns();
    const req = {
      params: {},
      body: [
        { quantity: 1 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateAddSale(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('Ao passar um input que não seja um array, a venda não é cadastrada - status 422', async function () {
    const next = sinon.stub().returns();
    const req = {
      params: {},
      body: {
        field1: { productId: 1, quantity: 1 },
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateAddSale(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: 'You must to pass an array' });
  });

  it('Deletando sale com sucesso - status 204', async function () {
    sinon.stub(salesService, 'deleteSale').resolves({ status: 'DELETED' });

    const req = {
      params: { id: 1 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      end: sinon.stub(),
    };

    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledWith();
  });

  it('Não é possível deletar um product com o id inexistente - status 404', async function () {
    sinon.stub(salesService, 'deleteSale').resolves(
      { status: 'NOT_FOUND', data: { message: 'Sale not found' } },
    );

    const req = {
      params: { id: 999999 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});