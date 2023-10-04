import path from "path";
import * as dotenv from "dotenv";

const rootPath = __dirname;
dotenv.config();

const config = {
  rootPath,
  publicPath: path.join(rootPath, "public"),
  db: "mongodb://localhost/musicApp",
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
};

export default config;
