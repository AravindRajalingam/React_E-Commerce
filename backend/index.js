const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const router = require("./routes/route");

dotenv.config({ path: path.join(__dirname, "config", "server.env") });
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT} in ${process.env.DEVELOPMENT_ENV} mode`
  );
});
