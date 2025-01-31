import { TaskModel } from "../models/taskModel/taskmodel.js";

const deleteTask = async (req, res) => {
  const { taskId, userId } = req.params;

  console.log(taskId);

  try {
    await TaskModel.deleteOne({ _id: taskId });
    const tasks = await TaskModel.find({ userId: userId });

    return res.status(200).json({ status: "success", tasks: tasks });
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export { deleteTask };
