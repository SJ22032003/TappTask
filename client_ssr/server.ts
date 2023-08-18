import express from "express";
import cors from "cors";
import connectToDB from "./config/db.config";
import protect from "./middlewares/auth.middleware";
import errorHandler from "./middlewares/error.middleware";
import publicRouter from "./routes/public.routes";
import userRouter from "./routes/user.routes";

// connect to database
connectToDB();

// Express App
const app = express();
const port: number = Number(process.env.PORT) || 5050;
const api: string = process.env.API_V_1 || "/api/v1";

// Cors Middlewares
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"],
    origin: "*",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(`${api}/public`, publicRouter);
app.use(`${api}/user`, protect, userRouter);

const server = app.listen(port, () => {
  console.log(`🌐 Server is running on port ${port} 🌐`);
});

// Middlewares
app.use(errorHandler);

// Graceful Shutdown
type ExitHandlerOptions = {
  shutdownSERVER: boolean;
};
const exitHandler = (options: ExitHandlerOptions, exitCode: number) => {
  if (options.shutdownSERVER) {
    console.log("\n🙌Shutting down... SERVER🙌");
    server.close(() => {
      console.log("Process terminated! 💀", exitCode);
      process.exit(0);
    });
  }
};
process.on("SIGINT", exitHandler.bind(null, { shutdownSERVER: true }));
