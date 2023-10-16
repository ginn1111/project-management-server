import express from "express";
import todoRouter from "./routes/todo";
import router from "./routes";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser);
app.use(router);

app.listen(3000, () => console.log("server is running on port 3001"));
