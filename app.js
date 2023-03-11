const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');


dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

require('./db/conn')

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


app.listen(PORT, () => {
    console.log(`Server is up & running at port ${PORT}`);
});