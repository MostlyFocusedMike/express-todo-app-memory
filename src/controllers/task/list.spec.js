const request = require('supertest');
const app = require('../../server');

describe('Integration Tests', () => {
  afterEach(async () => request(app).delete('/api/tasks'));

  it('GET /api/tasks sees all tasks', async () => {
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

    const res = await request(app).get('/api/tasks')

    const [task1, task2] = res.body;

    expect(res.status).toEqual(200);
    expect(task1.id).toBeGreaterThan(0);
    expect(task1.title).toBe(taskTitle1);
    expect(task1.isDone).toBe(false);
    expect(task2.id).toBeGreaterThan(0);
    expect(task2.title).toBe(taskTitle2);
    expect(task2.isDone).toBe(false);
  });
});