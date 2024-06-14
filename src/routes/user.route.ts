import { Router } from "express";
import { login, logout, refreshToken, register } from "../auth/auth";
import { deleteUserById, getAllUsers, getUserById, updateUser } from "../controllers/user.controller";


const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);
router.put('/:id', updateUser);
router.post("/", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout",  logout);


export default router;
