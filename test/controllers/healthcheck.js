/* eslint-disable no-useless-catch */

const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('/heathcheck', () => {
  it('return Healthcheck OK', async () => {
    try {
      const port = process.env.PORT;
      const baseURL = `http://localhost:${port}`;
      const response = await chai.request(baseURL).get('/send/healthcheck');
      expect(response).to.have.status(200);
      expect(response.res.text).to.eql('Healthcheck OK');
    } catch (error) {
      throw error;
    }
  });
});
