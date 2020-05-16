const express = require("express"),
      app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Route
app.get("/", (req, res) => {
    res.render("index");
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server started on " + port);
});