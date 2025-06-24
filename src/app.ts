import express from "express";
import router from "./routes/route";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", router);
app.listen(process.env.PORT, () => {
  console.log("Server Is Running");
});
