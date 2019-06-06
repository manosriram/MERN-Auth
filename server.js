const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const db = require("./Setup/url").url;
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected !"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  return res.json({ message: "Default Route!" });
});

app.use("/auth", require("./Routes/Auth"));
app.listen(port, () => console.log(`Server at ${port}`));
module.exports = app;
