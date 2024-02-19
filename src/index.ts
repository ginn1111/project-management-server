import express from "express";
import router from "./routes";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./services/connect-db";

dotenv.config({ path: `.env.${process.env.NODE_ENV ?? "development"}` });
console.log(process.env.DATABASE_URL_POSTGRES);

const app = express();

app.use(
	cors({
		credentials: true,
		origin: process.env.CORS_ORIGINS?.split(",") as string[],
	}),
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/health", (_, res) => {
	res.status(200).json("ok");
});
app.use(router);

app.listen(8080, () => console.log("server is running on port 8080"));
connectDB();
