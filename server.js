const jsonServer = require('json-server');


const server = jsonServer.create();

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  if (req.headers.authorization === 'Bearer my-secret-token') {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('🚀 JSON Server running at http://localhost:3000');
});
