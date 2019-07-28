const request = require('supertest');
const app = require('../../lib/app');

jest.mock('../../lib/middleware/mail/configureMail');

describe('contact routes', () => {
  it('sends email inquiry with confirmation', done => {
    return request(app)
      .post('/contact')
      .send({
        message: {
          name: 'Mr. Test',
          email: 'test@email.com',
          text: 'Test email via ethereal!!'
        }
      })
      .then(res => {
        const { previewUrl, previewUrlConfirm } = res.body;

        expect(previewUrl).toBeTruthy();

        expect(previewUrlConfirm).toBeTruthy();

        done();
      });
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
