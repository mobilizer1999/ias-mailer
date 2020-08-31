/* eslint-disable no-useless-catch */
const { expect } = require('chai');
const _ = require('lodash');
const { MailerCredentialsModel } = require('../../src/models');

/* eslint-disable func-names */
describe('MailerCredentials Model', function () {
  this.timeout(10000);
  it('is able to get mailer credentials using the correct apiKey and Pass Combination', async () => {
    try {
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
});
