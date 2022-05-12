import { Router } from "express";
import {
  getUsers,
  createUser,
  getUsersById,
} from "../controller/users.controller";
const router = Router();

router.get("/", getUsers);
router.get("/:empId", getUsersById);
router.post("/", createUser);
// app.get("/user/:empId", async (req: any, res: any) => {
//   const data = await prisma.users.findMany({
//     where: {
//       employee_id: req.params.empId,
//     },
//   });
//   res.status(200);
//   res.send(data);
// });
export default router;
