const express = require("express");
const app = express();
const path = require("path");
const cohere = require("cohere-ai");
cohere.init("safKkllsRzrjHZaPLK48c0isrOVeG5KRLsS5xO3a");

app.use(express.static(__dirname + "/public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

async function classify(inputs) {
  const response = await cohere.classify({
    model: "large",
    inputs: inputs,
    examples: [
      { text: "Do I recycle a pop can", label: "Recycle" },
      { text: "Do banana peels go in the compost", label: "Compost" },
      { text: "What should I do with my tv stand", label: "Donate" },
      { text: "Should I recycle plastic", label: "Recycle" },
      { text: "What do I do with plastic straws", label: "Recycle" },
      { text: "Is all food compostable", label: "Compost" },
      { text: "How do I get rid of furniture", label: "Donate" },
    ],
  });
  //   console.log(
  //     `The confidence levels of the labels are ${JSON.stringify(
  //       response.body.classifications
  //     )}`
  //   );
  return response;
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/html/index.html"));
});

app.get("/classification", (req, res) => {
  classify(["hello"]).then((response) => {
    res.status(200).json(response.body);
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
