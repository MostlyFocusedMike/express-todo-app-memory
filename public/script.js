// UTILS ///////////////////////////////////////////////////////////////////////
const escapeStr = (htmlStr) => htmlStr.replace(/&/g, '&amp;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const getOptsWithBody = (body, method = 'POST') => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const handleError = (error) => alert(error.message);

const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(response.statusText);
    if (response.status === 204) return [{}];
    return [await response.json()];
  } catch (error) {
    return [null, error];
  }
};

// DOM MANIPULATION ////////////////////////////////////////////////////////////
const getTaskTemplate = (taskElementId, id, title, isDone) => `
  <input
    type="checkbox"
    ${isDone ? 'checked' : ''}
    id="${taskElementId}"
    data-task-id="${id}"
    class="done-checkbox"
    data-task-id="${id}"
  />
  <label id="is-done-label" for="${taskElementId}" data-task-id="${id}" >
    ${escapeStr(title)}
  </label>
  <button
    title="Delete task"
    aria-label="Delete task"
    type="button"
    class="delete-task flex-end"
    data-task-id="${id}"
  > X </button>
`;

const renderTask = ({ id, title, isDone }) => {
  const newListItem = document.createElement('li');
  newListItem.classList.add('card');
  newListItem.innerHTML = getTaskTemplate(`task-${id}`, id, title, isDone);
  document.querySelector('#task-list').append(newListItem);
};

const createNewTask = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const title = formData.get('title');
  if (!title) return;

  const postOpts = getOptsWithBody({ title });
  const [task, error] = await fetchData('/api/tasks', postOpts);
  if (error) return handleError(error);

  renderTask(task);
  e.target.reset();
};

// EVENT HANDLERS //////////////////////////////////////////////////////////////
const loadInitialTasks = async () => {
  const [tasks, err] = await fetchData('/api/tasks');
  if (err) return handleError(err);
  tasks.forEach(renderTask);
};

const handleDelete = async (target, taskId) => {
  const [_, err] = await fetchData(`/api/tasks/${taskId}`, { method: 'DELETE' });
  if (err) return handleError(err);
  target.parentElement.remove();
};

const handleCheckChange = async (isDone, taskId) => {
  const opts = getOptsWithBody({ isDone }, 'PATCH');
  const [_, err] = await fetchData(`/api/tasks/${taskId}`, opts);
  if (err) return handleError(err);
};

const handleUpdates = async ({ target }) => {
  const { taskId } = target.dataset;
  if (!taskId) return;

  if (target.classList.contains('delete-task')) {
    handleDelete(target, taskId);
  } else if (target.classList.contains('done-checkbox')) {
    handleCheckChange(target.checked, taskId);
  }
};

// MAIN ////////////////////////////////////////////////////////////////////////
const main = () => {
  loadInitialTasks();
  document.querySelector('#add-task').addEventListener('submit', createNewTask);
  document.querySelector('#task-list').addEventListener('click', handleUpdates);
};

main();
