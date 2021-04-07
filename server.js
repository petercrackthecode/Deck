const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
//AuthRoutes
var UserController = require("./user/UserController");
var AuthController = require("./auth/AuthController");

const app = express();
app.use(cors());

//connect to DB
dotenv.config();
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", AuthController);
app.use("/users", UserController);

let accessToken = null,
    user = null;

app.get("/api/get-access-token", (req, res) => { // auto bot will communicate with this route only.
  const checkAccessToken = setInterval(() => {
    if (accessToken && user) {
      console.log(`Hi I'm the access token = ${accessToken}`);
      clearInterval(checkAccessToken);
      res.send({"accessToken": accessToken, "user": user});
      // clean up the accessToken and user on the server memory after passing them out.
    }
    else console.log("I'm not activated");

    accessToken = null;
    user = null;
  }, 500);
});

app.post("/api/test", (req, res, next) => {
  res.status(200).send("Testing");
});

app.post("/api/pass-access-token", (req, res, next) => {
  console.log(`Hi this is req.body`);
  console.log(req.body);
  accessToken = req.body.accessToken;
  user = req.body.user;
  res.status(200).send("Access token is successfully passed");
  next();
});

app.listen(process.env.PORT, () => console.log(`Server up and running at ${process.env.PORT}`));
