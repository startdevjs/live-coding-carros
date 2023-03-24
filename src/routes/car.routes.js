const { verifyToken } = require("../middlewares/auth");
const {
  create,
  edit,
  get,
  getId,
  remove,
  getByModel,
} = require("../controllers/car.controller");

exports.carRoutes = (app) => {
  app.get("/car", get);
  app.get("/car/:id", getId);
  app.put("/car/:id", verifyToken, edit);
  app.post("/car", verifyToken, create);
  app.delete("/car/:id", verifyToken, remove);
  app.get("/car/search/get", getByModel);
};
