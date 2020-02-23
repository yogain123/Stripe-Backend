const express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
require("dotenv").config();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3009;

app.use(express.json());

var routing = require("./routes");

app.use(bodyParser.json());

app.use("/", routing);

app.listen(port);
