const { login, validate } = require("../controllers/auth.controller");

exports.authRoutes = (app) => {
  app.post("/login", login);
  app.post("/validate", validate);
};
