const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY =
  require("./node_modules/json-server-auth/dist/constants").JWT_SECRET_KEY;
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.db = router.db;
// Add custom middleware for CORS
server.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    req.headers["origin"] || req.get("Origin")
  ); // Allow any origin
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
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

server.get("/profile", auth, (req, res, next) => {
  const token = req.header("Authorization")
    ? req.header("Authorization").replace("Bearer ", "")
    : null;
  if (token) {
    try {
      const data = jwt.verify(token, JWT_SECRET_KEY);

      const { db } = req.app;
      let user = db.get("users").find({ email: data.email }).value();
      res.json({ ...user, password: undefined });
    } catch (error) {
      res.json({ error: error.message });
    }
  } else {
    res.json({ error: { name: "User not authorized" } });
  }
});

server.use("/", router); // You can change the base URL here, e.g., '/api'
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
