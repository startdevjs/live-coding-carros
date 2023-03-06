const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

require("./routes/index")(app);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
