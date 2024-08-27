import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/user.route.js";
import exploreRoutes from "./routes/explore.route.js";

dotenv.config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(5000, () => {
  console.log("\nServer is running on port 5000");
});

//mongodb+srv://dilanshanuka999:1234@cluster0.yxvng.mongodb.net/github?retryWrites=true&w=majority&appName=Cluster0
