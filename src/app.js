const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require(`./utils/forecast.js`);

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine to serve
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Vidit Shah"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Vidit Shah"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide an Address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      // forecast(data.latitude, data.longitude, (error, forecastData) => {
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        return res.send({
          location,
          forecast: forecastData,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    msg: "Help will always be given at Hogwarts to those who ask for it!",
    name: "Vidit Shah"
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    errorMsg: "Help article not found",
    name: "Vidit Shah",
    title: "404 Page Not found"
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    errorMsg: "Page not found",
    name: "Vidit Shah",
    title: "404 Page Not found"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
