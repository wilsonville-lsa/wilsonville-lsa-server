const request = require('supertest');
const app = require('../../lib/app');

describe('contact routes', () => {
  it('sends email inquiry', () => {
    return request(app)
      .post('/contact')
      .send({
        message: {
          name: 'Mr. Test',
          email: 'test@email.com',
          text: 'Test email via ethereal!!'
        }
      })
      .then(res => expect(res.body.previewUrl).toBeTruthy());
  });

  it('errors on invalid submission', () => {
    return request(app)
      .post('/contact')
      .send({
        message: {
          name: 'Mr. Test',
          email: 'test@email.com',
          text: ''
        }
      })
      .then(res => expect(res.body).toEqual({ error: 'Incomplete form' }));
  });
});
