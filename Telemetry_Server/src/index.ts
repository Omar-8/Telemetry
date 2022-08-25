import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { handleTelemetry } from "./service";

const app: Express = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/telemetry", async function (req, res) {
  handleTelemetry(req.body);
  return res.sendStatus(200);
});

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${3000}`);
});
