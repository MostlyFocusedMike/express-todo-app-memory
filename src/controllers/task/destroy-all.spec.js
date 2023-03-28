const request = require('supertest');
const app = require('../../server');

describe('Integration Tests', () => {
  afterEach(async () => request(app).delete('/api/tasks'));

  it('DELETE /api/tasks deletes all tasks', async () => {
    const taskTitle1 = 'Create the first task';
    const taskTitle2 = 'Create the second task';
    await request(app)
      .post('/api/tasks')
      .send({ title: taskTitle1 })
      .set('Accept', 'application/json')

    await request(app)
      .post('/api/tasks')
      .send({ title: taskTitle2 })
      .set('Accept', 'application/json')

    const deleteRes = await request(app).delete('/api/tasks');

    expect(deleteRes.status).toEqual(204);
    expect(deleteRes.body).toEqual({});
  });

  it('DELETE /api/tasks 404 if there were no tasks', async () => {
    const updateRes = await request(app)
      .delete('/api/tasks')

    expect(updateRes.status).toEqual(404);
    expect(updateRes.body).toEqual({});
  });
});