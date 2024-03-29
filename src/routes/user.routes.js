const {
  create,
  get,
  getId,
  edit,
  remove,
} = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth");

exports.userRoutes = (app) => {
  app.post("/user", create);
  app.get("/user", verifyToken, get);
  app.get("/user/:id", verifyToken, getId);
  app.put("/user/:id", verifyToken, edit);
  app.delete("/user/:id", verifyToken, remove);
};
