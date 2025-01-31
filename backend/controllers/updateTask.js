import { TaskModel } from "../models/taskModel/taskmodel.js";

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body;

  try {
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ status: "fail", message: "Task not found" });
    }

    // Update task fields dynamically
    Object.keys(updates).forEach((key) => {
      task[key] = updates[key];
    });

    console.log(updates);

    await task.save();

    const tasks = await TaskModel.find({ userId: task.userId });

    res.status(200).json({ status: "success", tasks });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export { updateTask };
