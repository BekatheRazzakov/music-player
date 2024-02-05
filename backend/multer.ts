import multer from "multer";
import { randomUUID } from "crypto";

const multerStorage = multer.diskStorage({
  filename: (_req, file, cb) => {
    cb(null, randomUUID() + file.originalname);
  },
});

export const upload = multer({ storage: multerStorage });
