import cors from "cors";
import express from "express";
import router from "./routes/route";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.use(
  cors({
    origin: ["http://localhost:5173", "https://circle-umber.vercel.app"],
  })
);
app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.use(express.urlencoded());
app.use("/api/v1", router);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
