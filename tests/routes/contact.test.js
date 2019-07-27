const request = require('supertest');
const app = require('../../lib/app');

describe('contact routes', () => {
  it('sends email inquiry', () => {
    return request(app)
      .post('/contact')
      .send({
        from: 'Test Email <test@email.com>',
        to: process.env.EMAIL_USER,
        subject: 'Inquiry',
        text: 'Test email via ethereal!!'
      })
      .then(res => expect(res.body.previewUrl).toBeTruthy());
  });
});
