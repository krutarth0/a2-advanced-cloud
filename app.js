const express = require("express");
const aws = require("aws-sdk");
const axios = require("axios");
fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/send", async (req, res) => {
  var data = await axios
    .post("http://3.88.132.229/begin", {
      banner: "B00896235",
      ip: "3.86.227.244",
    })
    .then((data) => {
      console.log(data);
      // res.json({ score: data });
    })
    .catch(function (error) {
      console.log(error);
      // res.json({ _errmsg: error.message });
    });

  res.json({ score: data });
});

app.post("/storedata", async (req, res) => {
  // console.log(req.body);
  const s3 = new aws.S3({
    accessKeyId: "ASIAWOU5GAJSX7MTD66R",
    secretAccessKey: "LQrz3UrH9VeQWRieY+BOcm9ZNjxhXxiGbN0GX4WR",
    sessionToken:
      "FwoGZXIvYXdzEBAaDCCG5dar3M7Xj+EYZyLAAbASBZT69ePt+xVHS4Eis327DQlQvNKXp29L2pGuWiazSoPH+HAL147TUpDHZpGTLf5rGoq56LTP+sSu0IN6MsqAh+5J0oY1AzXIg/vttOCIMDOlZStMlqsUWF3xwi8Eml5MpTvTU4MEk1o+jdqBIveuz6DEsd+PrE6salVeTGuDWoKwIFOagUsSaypJfZ95bO4qJPt+CUQvSYNlE6MAYjSWdzl5sSt/d0KMJmZzYb9mm/d3nT/aTsdJnI6SfUAg7CjwpYqRBjIt3ORnW84k/4mug4TSQR5Y6Ol1ViwnKSBzNS/eSynYNRGXFTjINpy4q5j8zgdv",
  });

  s3.upload(
    {
      Bucket: "a2-advanced-cloud",
      Key: "a2_res.txt",
      Body: req.body.data,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({ s3uri: data.Location });
    }
  );
});

app.get("/", (req, res) => {
  console.log("AT THE VERY BEGINING");
  res.json({ message: "suuupp dude, are you lost ?" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
