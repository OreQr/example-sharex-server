import {
  port,
  url,
  redirect,
  max_size,
  key,
  storage_path,
} from "./config.json";
import express, { Express, Request, Response } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import { formatSize } from "./utils/formatter";
import db from "node-localdb";
import shortid from "shortid";
import fs from "fs";
import path from "path";

const app: Express = express();

const uploads = db("db.json");
interface Upload {
  id: string;
  name: string;
  created: number;
}

app.use(
  fileUpload({
    safeFileNames: true,
    preserveExtension: true,
    limits: {
      fileSize: formatSize(max_size),
    },
    abortOnLimit: true,
    useTempFiles: true,
  })
);

app.post("/upload", (req: Request, res: Response) => {
  if (req.body.key !== key) {
    res.sendStatus(401);
    return;
  }

  if (!req.files || !req.files.file) {
    res.sendStatus(400);
    return;
  }

  var file = req.files.file as UploadedFile;

  var id = shortid.generate();

  // Create storage directory if doesn't exist
  if (!fs.existsSync(storage_path)) {
    fs.mkdirSync(storage_path);
  }

  // Create file
  file.mv(path.join(storage_path, file.name), (error: Error) => {
    if (error) {
      res.sendStatus(500);
      return;
    }

    // Add to the database
    uploads
      .insert({ id: id, name: file.name, created: new Date() })
      .then(() => {
        res.send(`${url}/${file.name}`);
      });
  });
});

app.get("/:file", (req: Request, res: Response) => {
  uploads.findOne({ name: req.params.file }).then((result: Upload) => {
    // Check if the file exist in database
    if (!result) {
      res.sendFile(path.join(__dirname, "../public/404.html"));
      return;
    }

    // Check if the file exists
    if (!fs.existsSync(path.join(storage_path, result.name))) {
      res.sendFile(path.join(__dirname, "../public/404.html"));
      return;
    }

    res.sendFile(path.resolve(path.join(storage_path, result.name)));
  });
});

app.get("/*", (req: Request, res: Response) => {
  res.redirect(redirect);
});

app.listen(port, () => {
  console.log(`📦 Server listening on port \x1b[1m\x1b[35m${port}\x1b[0m`);
});
