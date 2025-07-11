import express from "express";
import router from "./routes/route";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cors({
  origin: ["http://localhost:5173", "https://circle-git-main-muhammad-afdal-rafis-projects.vercel.app"]
}));
app.use(cookieParser());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use("/api/v1", router);
app.listen(process.env.PORT, () => {
  console.log("Server Is Running");
});
