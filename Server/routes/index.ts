import express from "express";
const router = express.Router();
import users from "./users.routes";
import tasks from "./tasks.routes";
import exit from "./exits.routes";
import lettergenaration from "./lettergenaration.routes";
router.use("/users", users);
router.use("/tasks", tasks);
router.use("/exits", exit);
router.use("/lettergenaration", lettergenaration);

export default router;
