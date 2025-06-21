import { Router } from "express";
import {
    createTransaction,
    donationHistory,
    getTransactionByTxHash,
} from "../controllers/transaction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();    

router.route("/transaction").post(verifyJWT, authorizeRoles("user"), createTransaction);
router.route("/my-donations").get(verifyJWT, authorizeRoles("user"), donationHistory);
router.get("/receipt", verifyJWT, getTransactionByTxHash);

export default router
