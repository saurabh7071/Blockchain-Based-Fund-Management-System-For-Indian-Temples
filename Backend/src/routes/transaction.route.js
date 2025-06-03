import { Router } from "express";
import {
    donateToTemple
} from "../controllers/transaction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();    

router.route("/donate-to-temple").post(verifyJWT, authorizeRoles("user"), donateToTemple);

export default router
