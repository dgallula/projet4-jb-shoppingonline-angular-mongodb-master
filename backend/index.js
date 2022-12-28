const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./common/databaseConfig");
const serverConnections = require("./common/config");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(`${dbConfig.url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

require("./routes/category.routes")(app);
require("./routes/products.routes")(app);
require("./routes/users.routes")(app);
require("./routes/cart.routes")(app);
require("./routes/uploadFiles.routes")(app);

app.listen(serverConnections.port, () => {
  console.log(`Server is listening on port ${serverConnections.port}`);
});
