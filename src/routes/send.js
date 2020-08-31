const express = require('express');
const {
  sendMail, sendSMS, sendWhatsapp, healthCheck,
} = require('../controllers');
const passport = require('../lib/passport');

const router = express.Router();
router.get('/healthcheck', healthCheck);
router.post('/email', [passport], sendMail);
router.post('/sms', [passport], sendSMS);
router.post('/whatsapp', [passport], sendWhatsapp);

module.exports = router;
