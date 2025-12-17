import Express from "express";
import LoanController from "@controllers/LoanController";
const router = Express.Router();

router.use("/loans", LoanController);

export default router;
