import getMenu from "../controllers/menu.controller.js";
import { Router } from "express";

const router = Router();

router.get("/:restaurantId", getMenu);

export default router;
