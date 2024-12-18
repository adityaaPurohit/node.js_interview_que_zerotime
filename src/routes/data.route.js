const express = require("express");
const routes = express.Router();

const { searchdata } = require("../controllers/data.controller");

routes.post("/search-term", searchdata);

module.exports = routes;
