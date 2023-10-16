import { Router } from "express";

import employeeRoute from "./nhan-vien";

const router = Router();

router.use("/nhan-vien", employeeRoute);

export default router;
