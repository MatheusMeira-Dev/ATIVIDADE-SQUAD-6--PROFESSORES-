require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const rotaProduto = require("./routes/produtos");
app.use(rotaProduto);

mongoose.connect(process.env.MONGODB_URL)

app.listen(3000, () => {
console.log("Servidor rodando em http://localhost:3000/");
})