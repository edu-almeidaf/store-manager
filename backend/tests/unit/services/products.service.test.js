const { expect } = require('chai');
const sinon = require('sinon');
const {
  productsFromModel, productFromModel, productIdFromModel, newProductFromModel, updatedProductFromModel, productsByQuery,
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

  it('Filtrando products pela query com sucesso', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromModel);

    const inputData = 'Tra';
    const responseService = await productsService.findByQuery(inputData);

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.lengthOf(1);
    expect(responseService.data).to.be.deep.equal(productsByQuery);
  });

  it('Retorna todos os produtos se não existir a query', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromModel);

    const inputData = undefined;
    const responseData = [...productsFromModel];
    const responseService = await productsService.findByQuery(inputData);

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

  it('Inserindo product com sucesso', async function () {
    sinon.stub(productsModel, 'insert').resolves(productIdFromModel);
    sinon.stub(productsModel, 'findById').resolves(newProductFromModel);

    const inputData = { name: 'Armadura do Homem de Ferro' };
    const responseService = await productsService.createProduct(inputData);
    expect(responseService.status).to.be.equal('CREATED');
    expect(responseService.data).to.be.deep.equal({ id: 4, name: 'Armadura do Homem de Ferro' });
  });

  it('Não é possível criar um product com o name contendo menos que 5 caracteres', async function () {
    const inputData = { name: 'Arm' };
    const responseService = await productsService.createProduct(inputData);
    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data).to.be.deep.equal({
      message: '"name" length must be at least 5 characters long',
    });
  });

  it('Atualizando product com sucesso', async function () {
    sinon.stub(productsModel, 'update').resolves(undefined);
    sinon.stub(productsModel, 'findById')
      .onFirstCall()
      .resolves(productFromModel)
      .onSecondCall()
      .resolves(updatedProductFromModel);
    const inputId = 1;
    const inputData = { name: 'Jóia do tempo' };
    const responseService = await productsService.updateProduct(inputId, inputData);
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.deep.equal({ id: 1, name: 'Jóia do tempo' });
  });

  it('Não é possível atualizar um product com o name contendo menos que 5 caracteres', async function () {
    const inputId = 1;
    const inputData = { name: 'Jói' };
    const responseService = await productsService.updateProduct(inputId, inputData);
    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data).to.be.deep.equal({
      message: '"name" length must be at least 5 characters long',
    });
  });

  it('Não é possível atualizar um product com o id inexistente', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const inputId = 999999;
    const inputData = { name: 'Jóia do tempo' };
    const responseService = await productsService.updateProduct(inputId, inputData);
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Deletando product com sucesso', async function () {
    sinon.stub(productsModel, 'remove').resolves(undefined);
    sinon.stub(productsModel, 'findById').resolves(productFromModel);
    
    const inputId = 1;
    const responseService = await productsService.deleteProduct(inputId);
    expect(responseService.status).to.be.equal('DELETED');
  });

  it('Não é possível deletar um product com id inexistente', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const inputId = 999999;
    const responseService = await productsService.deleteProduct(inputId);
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});