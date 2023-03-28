# To Do List

## Pessimistic vs Optimistic Rendering
Notice that we are using both.

- Pessimistic for creating a new todo and deleting a todo
- Optimistic for the checkbox

## What's escaping?
While it's true innerHTML doesn't execute script tags, there are other ways hackers could mess with your stuff to execute JS:

```js
<img src='x' onerror='alert(`HACKED WAHAHAHA`)'>
```

That's why we want to escape all user input. If we had a DB, we'd want to escape it there too, but for now we're just using the client.