const {
  create,
  get,
  getId,
  edit,
  remove,
} = require("../controllers/user.controller");

exports.userRoutes = (app) => {
  app.post("/user", create);
  app.get("/user", get);
  app.get("/user/:id", getId);
  app.put("/user/:id", edit);
  app.delete("/user/:id", remove);
};
