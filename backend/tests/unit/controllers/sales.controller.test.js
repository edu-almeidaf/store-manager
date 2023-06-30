const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const {
  salesFromServiceSuccessful,
  salesFromModel,
  saleFromServiceSuccessful,
  saleFromModel,
} = require('../mocks/sales.mock');
const { salesController } = require('../../../src/controllers');

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

  afterEach(function () {
    sinon.restore();
  });
});