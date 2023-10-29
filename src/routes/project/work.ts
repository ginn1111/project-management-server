import { Router } from "express";
import { getList } from "../../controllers/project/work";

const workRouter = Router();

workRouter.get("/:id", getList);

export default workRouter;
