import React from "react";
import { Button, Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateUserTasks } from "../features/task/taskSlice";
import axios from "axios";

function AddTask() {
  const [taskDetails, setTaskDetails] = React.useState({
    title: "",
    description: "",
    date: "",
    status: "pending",
  });
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = async () => {
    console.log(user);

    //check if task fields have values
    if (
      taskDetails.title.trim().length === 0 ||
      taskDetails.description.trim().length === 0 ||
      taskDetails.date.trim().length === 0
    ) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/tasks/addTask",
        { ...taskDetails, userId: user._id }
      );

      if (response.data.status === "success") {
        console.log("Task added successfully");
        dispatch(updateUserTasks(taskDetails));
        setTaskDetails({ title: "", description: "", date: "" });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div>
          <Button type="primary" onClick={showModal}>
            Add Task
          </Button>
          <Modal
            title="Add New Task"
            open={isModalOpen}
            onOk={handleAddTask}
            onCancel={handleCancel}
          >
            <Input
              name="title"
              placeholder="task title"
              value={taskDetails.title}
              onChange={handleChange}
              style={{ marginBottom: "10px" }}
            />
            <Input
              name="description"
              placeholder="task description"
              value={taskDetails.description}
              onChange={handleChange}
              style={{ marginBottom: "10px" }}
            />
            <p>Task due date</p>
            <Input
              name="date"
              type="date"
              placeholder="task date"
              value={taskDetails.date}
              onChange={handleChange}
              style={{ marginBottom: "10px" }}
            />
          </Modal>
        </div>
      </section>
    </>
  );
}

export default AddTask;
