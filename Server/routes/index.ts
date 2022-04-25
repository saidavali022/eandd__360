import express from "express";
const router = express.Router();
import users from "./users.routes";
import tasks from "./tasks.routes";
router.use("/users", users);
router.use("/tasks", tasks);

export default router;
