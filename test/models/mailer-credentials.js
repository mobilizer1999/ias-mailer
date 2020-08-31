/* eslint-disable no-useless-catch */
const { expect } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const { MailerCredentialsModel } = require('../../src/models');

/* eslint-disable func-names */
describe('MailerCredentials Model', function () {
  this.timeout(10000);
  it('is able to get mailer credentials using the correct apiKey and Pass Combination', async () => {
    try {
      sinon.restore();
      const apiKey = 'sngiknluxeuenhkycbsnd';
      const apiPass = 'shfbajwfbukdnd8wsdws';

      const result = await MailerCredentialsModel.findByApiKeyAndPass(apiKey, apiPass);
      expect(_.omit(result, ['createdAt', 'updatedAt', 'disabled'])).to.eql({
        apiKey: 'sngiknluxeuenhkycbsnd',
        apiPass: 'shfbajwfbukdnd8wsdws',
        createdBy: '',
        enabledModules: 'app-api,sms',
        id: 0,
      });
    } catch (error) {
      throw error;
    }
  });

  it('should not be able to get mailer credentials if the provided apiKey is wrong', async () => {
    try {
      const apiKey = 'wrongapikey';
      const apiPass = 'shfbajwfbukdnd8wsdws';

      const result = await MailerCredentialsModel.findByApiKeyAndPass(apiKey, apiPass);
      expect(result).to.eql(null);
    } catch (error) {
      throw error;
    }
  });

  it('should not be able to get mailer credentials if the provided apiPass is wrong', async () => {
    try {
      const apiKey = 'sngiknluxeuenhkycbsnd';
      const apiPass = 'wrongapipass';

      const result = await MailerCredentialsModel.findByApiKeyAndPass(apiKey, apiPass);
      expect(result).to.eql(null);
    } catch (error) {
      throw error;
    }
  });
});
