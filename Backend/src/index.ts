import express from "express";
import { AuthRoute } from "./routes/auth.routes";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use("/", AuthRoute);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
