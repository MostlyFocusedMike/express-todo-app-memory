const path = require('path');
const express = require('express');
const apiRoutes = require('./routes');
const logRoutes = require('./middleware/log-routes');

const app = express();

const publicDir = path.join(__dirname, '..', 'public');
const staticServer = express.static(publicDir);
app.use(staticServer);

app.use(express.json());
app.use(logRoutes);
app.use(apiRoutes);

/**
 * If we *were* to use client side routing,
 * we need this to get the server not to eat the routes.
 * It also needs to be below the static server.
 */
// app.get('*', (req, res) => {
//   if (req.originalUrl.startsWith('/api')) next();
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

module.exports = app;
