const { userRoutes } = require("./user.routes");
const { authRoutes } = require("./auth.routes");
const { carRoutes } = require("./car.routes");

module.exports = (app) => {
  userRoutes(app);
  authRoutes(app);
  carRoutes(app);
};
