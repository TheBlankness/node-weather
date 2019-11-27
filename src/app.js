const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;
//Define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views locaiton
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "RoboMan"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "RoboMan"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    user: "John",
    message: "Your help has been received",
    title: "Help",
    name: "RoboMan"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address not sent"
    });
  }

  res.send({
    forecast: "Clear",
    location: req.query.address
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessagee: "Help page not found",
    name: "RoboMan"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessagee: "Help page not found",
    title: "404",
    name: "RoboMan"
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
