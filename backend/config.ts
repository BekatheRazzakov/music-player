import path from "path";
import * as dotenv from "dotenv";

const rootPath = __dirname;
dotenv.config();

const config = {
  rootPath,
  publicPath: path.join(rootPath, "public"),
  db: "mongodb+srv://arslanbekbolotov41:Wq9PMQjRwlCMdaIM@firstcluster.2bsagfi.mongodb.net/?retryWrites=true&w=majority",
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
};

export default config;
