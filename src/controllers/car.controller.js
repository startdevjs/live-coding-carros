const { prisma } = require("../prisma");
const { carValidation } = require("../validations/car.validation");

exports.create = async (req, res) => {
  console.log(req.body);
  try {
    await carValidation.validate(req.body);
    const data = req.body;
    const car = await prisma.car.create({
      data,
    });
    res.status(200).send(car);
  } catch (e) {
    console.log(e);
    res.send(400).send(e);
  }
};

exports.get = async (req, res) => {
  try {
    const cars = await prisma.car.findMany({});
    res.status(200).send(cars);
  } catch (e) {
    res.send(400).send(e);
  }
};

exports.getId = async (req, res) => {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).send(car);
  } catch (e) {
    res.send(400).send(e);
  }
};

exports.edit = async (req, res) => {
  try {
    const data = req.body;
    const car = await prisma.car.update({
      where: {
        id: Number(req.params.id),
      },
      data,
    });
    res.status(200).send(car);
  } catch (e) {
    console.log(e);
    res.send(400).send(e);
  }
};

exports.remove = async (req, res) => {
  try {
    await prisma.car.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.send(200).send();
  } catch (e) {
    res.send(400).send(e);
  }
};

exports.getByModel = async (req, res) => {
  try {
    const cars = await prisma.$queryRawUnsafe(
      `SELECT * FROM "Car" WHERE (model LIKE $1)`,
      `%${req.query.model}%`
    );

    res.status(200).send(cars);
  } catch (e) {
    console.log(e);
    res.send(400).send(e);
  }
};
