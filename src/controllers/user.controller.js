const { prisma } = require("../prisma");
const { userValidation } = require("../validations/user.validation");
const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
  try {
    req.body.password = await bcrypt.hashSync(req.body.password, 10);
    await userValidation.validate(req.body);
    const data = req.body;
    const user = await prisma.user.create({
      data,
    });
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

exports.get = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        phone: true,
        city: true,
      },
    });
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getId = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        phone: true,
        city: true,
      },
    });
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.edit = async (req, res) => {
  try {
    const data = req.body;
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        phone: true,
        city: true,
      },
    });
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.remove = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
