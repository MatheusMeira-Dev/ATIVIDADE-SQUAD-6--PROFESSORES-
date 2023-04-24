require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./routes/swagger.json")

const app = express();
app.use(express.json());

const rotaProduto = require("./routes/produtos");
app.use(rotaProduto);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

mongoose.connect(process.env.MONGODB_URL)

app.listen(3000, () => {
console.log("Servidor rodando em http://localhost:3000/");
})