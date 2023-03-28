const server = require('./server');
/* start the server */
const port = process.env.PORT || 4321;
const host = process.env.HOST || '0.0.0.0';

server.listen(port, host, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});
