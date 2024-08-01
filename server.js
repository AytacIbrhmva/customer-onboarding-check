const express = require("express");
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 4001;

connectDb();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/medias", require("./routes/mediaRoutes"));
app.use("/api/peps", require("./routes/pepRoutes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
