import { Router } from "express";
import { getList } from "../../controllers/project/resource";

const resourceRouter = Router();

resourceRouter.get("/:id", getList);

export default resourceRouter;
