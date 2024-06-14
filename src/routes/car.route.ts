import { Router } from "express";
import { createCar, getAllCars, updateCar, getCarById, deleteCar } from "../controllers/car.controller";
import upload from "../files/upload";
/***
import { verifyAccessToken } from "../utils/jwt";
 *  router.get("/",verifyAccessToken, getAllCars);
 */

const router = Router();

router.get("/", getAllCars);

router.post("/", upload.array('images', 10), createCar);
router.put("/:id", upload.array('images', 10), updateCar);
router.get("/:id", getCarById);
router.delete("/:id", deleteCar);

export default router;
