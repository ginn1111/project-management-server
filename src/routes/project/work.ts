import { Router } from "express";
import { getList, add } from "../../controllers/project/work";

const workRouter = Router();

workRouter.get("/:id", getList);
workRouter.post("/:id/create", add);

export default workRouter;
