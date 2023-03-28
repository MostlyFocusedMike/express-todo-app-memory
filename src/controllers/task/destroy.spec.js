const request = require('supertest');
const app = require('../../server');

describe('Integration Tests', () => {
  afterEach(async () => request(app).delete('/api/tasks'));

  it('DELETE /api/tasks/:id deletes an existing task', async () => {
    const taskTitle = 'Go to the store';
    const createRes = await request(app)
      .post('/api/tasks')
      .send({ title: taskTitle })
      .set('Accept', 'application/json')

    const { id } = createRes.body;

    const deleteRes = await request(app).delete(`/api/tasks/${id}`);

    expect(deleteRes.status).toEqual(204);
    expect(deleteRes.body).toEqual({});
  });

  it('DELETE /api/tasks/:id returns 404 if task does not exist', async () => {
    const updateRes = await request(app)
      .delete('/api/tasks/100')

    expect(updateRes.status).toEqual(404);
    expect(updateRes.body).toEqual({});
  });
});