import { TaskModel } from "../models/taskModel/taskmodel.js";

async function addTask(req, res) {
  const { title, description, date, userId } = req.body;
  try {
    const newTask = new TaskModel({
      title: title,
      description: description,
      date: date,
      userId: userId,
    });

    await newTask.save();
    res
      .status(201)
      .json({ message: "Task Added successfully", status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failed" });
  }
}

export { addTask };
