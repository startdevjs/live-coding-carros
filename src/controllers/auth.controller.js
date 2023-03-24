const { prisma } = require("../prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send({ message: "Usuário e senha obrigatórios" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw { message: "Usuário não existe" };
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Usuário e/ou senha incorretos" });
    }
  } catch (e) {
    res.status(401).send(e);
  }
};

exports.validate = async (req, res) => {
  try {
    if (!req.body.token) {
      return res.status(401).json({ message: "Token é obrigatório" });
    }

    const decode = await jwt.decode(req.body.token);

    res.status(200).send(decode);
  } catch (e) {
    res.status(400).send(e);
  }
};
