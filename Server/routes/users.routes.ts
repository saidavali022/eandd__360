import { Router } from "express";
import {
  getUsers,
  createUser,
  getUsersById,
} from "../controllers/users.controller";
const router = Router();

router.get("/", getUsers);
router.get("/:empId", getUsersById);
router.post("/", createUser);
export default router;
