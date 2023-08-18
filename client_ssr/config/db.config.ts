import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "";
const username = process.env.MONGO_HOST || "";
const password = process.env.MONGO_PSW || "";
const database = process.env.MONGO_DB || "";

const connectToDB = async (): Promise<void> => {
  try {
    await mongoose.connect(uri, {
      dbName: database,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: "majority",
      auth: {
        username,
        password,
      },
    } as mongoose.ConnectOptions);
    console.info("🎊Connected to database🎊");
    return Promise.resolve();
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  try {
    await mongoose.connection.close();
    console.info("👋Database connection closed successfully👋");
    process.exit(0);
  } catch (error) {
    console.error(`Error closing database connection: ${error}`);
    process.exit(1);
  }
};
process.on("SIGINT", gracefulShutdown);

export default connectToDB;
