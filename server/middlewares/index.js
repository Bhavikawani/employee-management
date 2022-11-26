require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const path = require("path")
const cookieParser = require('cookie-parser');

let cookieSecret = process.env.COOKIE_DEV_SECRET;

const initMiddleware = (app) => {
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: false, limit: "2mb" }));
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.static('static'))
  app.use(logger("dev"));
  app.use(cookieParser(cookieSecret))
};

module.exports = initMiddleware;
