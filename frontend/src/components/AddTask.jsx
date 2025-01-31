import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserTasks } from "../features/task/taskSlice";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Input } from "antd";
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
        <div className="container mx-auto flex flex-col items-center py-12">
          <Button
            type="primary"
            shape="round"
            onClick={showModal}
            icon={<PlusOutlined />}
          >
            Add Task
          </Button>
          <Modal
            title="Add New Task"
            open={isModalOpen}
            onOk={handleAddTask}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleAddTask}>
                Add Task
              </Button>,
            ]}
          >
            <div className="space-y-4">
              <Input
                name="title"
                placeholder="Task Title"
                value={taskDetails.title}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              <Input
                name="description"
                placeholder="Task Description"
                value={taskDetails.description}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              <div>
                <p className="mb-2">Task Due Date</p>
                <Input
                  name="date"
                  type="date"
                  placeholder="Task Date"
                  value={taskDetails.date}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
              </div>
            </div>
          </Modal>
        </div>
      </section>
    </>
  );
}

export default AddTask;
