import express from "express";
import { addTask } from "../controllers/addTask.js";
import { getAllTasks } from "../controllers/getTask.js";
import { updateTask } from "../controllers/updateTask.js";

import { deleteTask } from "../controllers/deleteTask.js";

const router = express.Router();

router.post("/addTask", addTask);
router.get("/gettasks/:userId", getAllTasks);
router.patch("/update/:taskId", updateTask);
router.delete("/delete/:taskId/:userId", deleteTask);

export default router;
