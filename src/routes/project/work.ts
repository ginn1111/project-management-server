import { Router } from "express";
import { getList, add, update } from "../../controllers/project/work";

const workRouter = Router();

workRouter.get("/:id", getList);
workRouter.post("/:id/create", add);
workRouter.post("/:idWorkProject/update", update);

export default workRouter;
