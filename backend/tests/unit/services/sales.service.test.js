const { expect } = require('chai');
const sinon = require('sinon');
const {
  salesFromModel, saleFromModel, saleIdFromModel, newSaleFromModel, updateSaleFromModel, updateSaleFromService,
} = require('../mocks/sales.mock');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { productsFromModel } = require('../mocks/products.mock');

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

  it('Inserindo uma venda com sucesso', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromModel);
    sinon.stub(salesModel, 'insertSale').resolves(saleIdFromModel);
    sinon.stub(salesModel, 'insertProductsOnSale')
      .onFirstCall()
      .resolves(1)
      .onSecondCall()
      .resolves(1);
    // sinon.stub(salesModel, 'findById').resolves(saleFromModel);

    const inputData = [
      {
        productId: 1,
        quantity: 5,
      },
      {
        productId: 2,
        quantity: 10,
      },
    ];

    const responseData = { ...newSaleFromModel };

    const responseService = await salesService.createSale(inputData);
    expect(responseService.status).to.be.equal('CREATED');
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Não é possível cadastrar uma venda com o quantity sendo 0', async function () {
    const inputData = [
      {
        productId: 1,
        quantity: 0,
      },
    ];

    const responseService = await salesService.createSale(inputData);
    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data).to.be.deep.equal(
      { message: '"quantity" must be greater than or equal to 1' },
    );
  });

  it(
    'Não é possível cadastrar uma venda em que o productId não esteja cadastrado no banco',
  async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromModel);

    const inputData = [
      {
        productId: 999999,
        quantity: 1,
      },
    ];

    const responseService = await salesService.createSale(inputData);
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
  },
  );

  it('Deletando sale com sucesso', async function () {
    sinon.stub(salesModel, 'removeSale').resolves(undefined);
    sinon.stub(salesModel, 'removeSaleProducts').resolves(undefined);
    sinon.stub(salesModel, 'findById').resolves(saleFromModel);

    const inputId = 1;
    const responseService = await salesService.deleteSale(inputId);
    expect(responseService.status).to.be.equal('DELETED');
  });

  it('Não é possível deletar uma sale com id inexistente', async function () {
    sinon.stub(salesModel, 'findById').resolves(undefined);
    const inputId = 999999;
    const responseService = await salesService.deleteSale(inputId);
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Atualizando sale com sucesso', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFromModel);
    sinon.stub(salesModel, 'updateSale').resolves(undefined);
    sinon.stub(salesModel, 'findUpdatedSaleById').resolves(updateSaleFromModel);
    const inputId = {
      saleId: 1,
      productId: 1,
      quantity: 20,
    };
    const responseService = await salesService.updateSale(inputId);
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.deep.equal(updateSaleFromService);
  });

  it('Não é possível atualizar a sale com quantity igual a 0', async function () {
    const inputId = {
      saleId: 1,
      productId: 1,
      quantity: 0,
    };
    const responseService = await salesService.updateSale(inputId);
    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data).to.be.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Não é possível atualizar a sale com o id inexistente', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const inputId = {
      saleId: 999999,
      productId: 1,
      quantity: 20,
    };
    const responseService = await salesService.updateSale(inputId);
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Não é possível atualizar a sale com o productId inexistente', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFromModel);
    const inputId = {
      saleId: 1,
      productId: 999999,
      quantity: 20,
    };
    const responseService = await salesService.updateSale(inputId);
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.deep.equal({ message: 'Product not found in sale' });
  });

  afterEach(function () {
    sinon.restore();
  });
});