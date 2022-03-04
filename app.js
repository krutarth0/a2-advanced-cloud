const express = require("express");
fs = require("fs");

const app = express();
const port = 80;

app.use(express.json());

app.get("/", (req, res) => {
  fs.writeFile("helloworld.txt", "Hello World!", function (err) {
    if (err) return console.log(err);
    console.log("Hello World > helloworld.txt");
  });

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
