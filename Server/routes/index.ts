import express from "express";
import users from "./users.routes";
import tasks from "./tasks.routes";
import exit from "./exits.routes";
import attendance from "./attendance.routes";
import lettergenaration from "./lettergenaration.routes";
import events from "./events.routes";
import init from "./init.routes";
const router = express.Router();

router.use("/init", init); //fill dummy data for testing purpose
router.use("/users", users);
router.use("/tasks", tasks);
router.use("/attendance", attendance);
router.use("/exits", exit);
router.use("/lettergenaration", lettergenaration);
router.use("/users/events", events);

export default router;
