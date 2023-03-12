const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./db/conn')


dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.use(require('./router/auth'))


const start = async () => {
  try {
      await connectDB();
      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}.`);
      });
  } catch (error) {
      console.log(error);
      console.log("Failed to connect to the database, server is not running.");
  }
};

start();