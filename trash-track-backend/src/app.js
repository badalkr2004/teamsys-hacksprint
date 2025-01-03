import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/trash-track");
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
