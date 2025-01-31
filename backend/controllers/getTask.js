import { TaskModel } from "../models/taskModel/taskmodel.js";

const getAllTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await TaskModel.find({ userId: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ data: tasks, status: "successfull" });
  } catch (error) {
    res.status(400).json({ data: error, status: "Failed" });
  }
};

export { getAllTasks };
