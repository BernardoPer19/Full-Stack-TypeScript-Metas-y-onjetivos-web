import express from "express";
import { AuthRoute } from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/metas.routes";
import { validateAuth } from "./middleware/validateAuth";
import cors from "cors";
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/", AuthRoute);
app.use("/metas", validateAuth, UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
