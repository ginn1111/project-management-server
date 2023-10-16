import express from "express";
import todoRouter from "./routes/todo";
import router from "./routes";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/health", (_, res) => {
	res.status(200).json("ok");
});
app.use(router);

app.listen(8080, () => console.log("server is running on port 8080"));
