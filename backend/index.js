const express = require("express");
const {rootRouter } = require("./routes");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/v1" , rootRouter);
app.listen(3000);
