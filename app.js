const express = require("express");
const dataRoutes = require("./src/routes/data.route");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use("/api", dataRoutes);

app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
