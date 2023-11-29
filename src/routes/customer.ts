import { Router } from "express";
import { addNew, deleteById, getList, update } from "../controllers/customer";

const customerRouter = Router();

customerRouter.get("/", getList);
customerRouter.post("/add", addNew);
customerRouter.patch("/:idCustomer/update", update);
customerRouter.delete("/:idCustomer/delete", deleteById);

export default customerRouter;
