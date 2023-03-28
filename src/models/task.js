const { generateId } = require('../utils');

class Task {
  static #all = [];

  constructor(title) {
    this.id = generateId();
    this.title = title;
    this.isDone = false;

    Task.#all.push(this);
  }

  static list() {
    return Task.#all;
  }

  static updateCompletion(taskId, isDone) {
    const task = Task.#all.find(({ id }) => id === taskId);
    if (!task) return null;

    task.isDone = isDone;
    return task;
  }

  static delete(taskId) {
    const taskIdx = Task.#all.findIndex(({ id }) => id === taskId);
    if (taskIdx < 0) return null;

    Task.#all.splice(taskIdx, 1);
    return Task.#all;
  }

  static deleteAll() {
    if (!Task.#all.length) return null;

    Task.#all.length = 0;
    return Task.#all;
  }
}

module.exports = Task;
