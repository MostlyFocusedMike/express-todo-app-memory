const request = require('supertest');
const app = require('../../server');

describe('Integration Tests', () => {
  afterEach(async () => request(app).delete('/api/tasks'));

  it('PATCH /api/tasks/:id updates a task completion', async () => {
    const taskTitle = 'Go to the store';
    const createRes = await request(app)
      .post('/api/tasks')
      .send({ title: taskTitle })
      .set('Accept', 'application/json')

    const { id } = createRes.body;

    const updateRes1 = await request(app)
      .patch(`/api/tasks/${id}`)
      .send({ isDone: true });

    expect(updateRes1.status).toEqual(200);
    expect(updateRes1.body.id).toBe(id);
    expect(updateRes1.body.title).toBe(taskTitle);
    expect(updateRes1.body.isDone).toBe(true);

    const updateRes2 = await request(app)
      .patch(`/api/tasks/${id}`)
      .send({ isDone: false });

    expect(updateRes2.status).toEqual(200);
    expect(updateRes2.body.id).toBe(id);
    expect(updateRes2.body.title).toBe(taskTitle);
    expect(updateRes2.body.isDone).toBe(false);
  });

  it('PATCH /api/tasks/:id returns 404 if task does not exist', async () => {
    const updateRes = await request(app)
      .patch('/api/tasks/100')
      .send({ isDone: true });

    expect(updateRes.status).toEqual(404);
    expect(updateRes.body).toEqual({});
  });
});