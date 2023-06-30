const { expect } = require('chai');
const sinon = require('sinon');
const {
  salesFromModel, saleFromModel,
} = require('../mocks/sales.mock');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

describe('Realizando testes - SALES Service:', function () {
  it('Recuperando sales com sucesso', async function () {
    sinon.stub(salesModel, 'findAll').resolves(salesFromModel);

    const responseData = [...salesFromModel];

    const responseService = await salesService.findAll();

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.lengthOf(3);
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Recuperando sale pelo id com sucesso', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFromModel);

    const responseData = [...saleFromModel];

    const inputData = 1;
    const responseService = await salesService.findById(inputData);

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Ao passar um id inválido, é retornado um status not found', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const inputData = 999999;
    const responseService = await salesService.findById(inputData);

    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data.message).to.be.a('string');
    expect(responseService.data.message).to.be.equal('Sale not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});