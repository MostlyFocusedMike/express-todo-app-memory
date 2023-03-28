const request = require('supertest');
const app = require('../../server');

describe('Integration Tests', () => {
  afterEach(async () => request(app).delete('/api/tasks'));

  it('POST /api/tasks creates a task', async () => {
    const taskTitle = 'Create a task';
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: taskTitle })
      .set('Accept', 'application/json')

    expect(res.status).toEqual(201);
    const { id, title, isDone } = res.body;
    expect(id).toBeGreaterThan(0);
    expect(title).toBe(taskTitle);
    expect(isDone).toBe(false);
  });
});