import { Router } from "express";
import {
    donateToTemple,
    donationHistory,
    generateTempleReport,
    templeDonations
} from "../controllers/transaction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();    

router.route("/donate-to-temple").post(verifyJWT, authorizeRoles("user"), donateToTemple);
router.route("/my-donations").get(verifyJWT, authorizeRoles("user"), donationHistory);
router.route("/generate-temple-report").get(verifyJWT, authorizeRoles("templeAdmin"), generateTempleReport);
router.route("/temple-donations").get(verifyJWT, authorizeRoles("templeAdmin"), templeDonations);


export default router
