const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token é obrigatório" });
  }

  try {
    const newToken = token.replace("Bearer ", "");
    jwt.verify(newToken, process.env.TOKEN_KEY);
    next();
  } catch (e) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
};
