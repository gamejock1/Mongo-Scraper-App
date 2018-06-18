const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cheerio = require("cheerio");
const request = require("request");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");




app.get('/', (req, res) => {
  res.render("index");
});




const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);







// Starting the scrape ====================================================================
app.get('/api/scrape', (req, res) => {
  request("https://www.theoutdoorstrader.com/forums/handguns.72/", function (error, response, html) {
    const $ = cheerio.load(html);
    const results = [];

    $("h3.title").each(function (i, element) {

      var link = $(element).children().attr("href");
      var title = $(element).children().text();

      results.push({
        title: title,
        link: link
      });
    });

    console.log(results);
  });
});
// ========================================================================================


// Setting up mongoose=====================================================================
const databaseUrl = "lessondb";
const collections = ["classifieds"];

const db = require("./db/models/models.js");




app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});