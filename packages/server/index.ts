import express from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running on http://localhost:3000");
});
