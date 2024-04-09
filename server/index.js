const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.db = router.db;
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});
server.use(auth);

server.use("/", router); // You can change the base URL here, e.g., '/api'

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
