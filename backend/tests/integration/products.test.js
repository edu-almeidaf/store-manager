const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../src/app');
const connection = require('../../src/models/connection');
const { productsFromDB } = require('../unit/mocks/products.mock');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testando as rotas - PRODUCTS', function () {
  it('Testando a rota GET /products', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const response = await chai.request(app).get('/products');

    expect(response.status).to.be.equal(200);
  });

  afterEach(function () {
    sinon.restore();
  });
});