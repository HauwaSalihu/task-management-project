import React, { useEffect } from "react";
import { Dropdown, Tag, Card, Button, Menu, Input, Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTasks } from "../features/task/taskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.userTasks);
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentTask, setCurrentTask] = React.useState(null);
  const [taskDetails, setTaskDetails] = React.useState({
    title: "",
    description: "",
    date: "",
  });

  function formatDate(params) {
    const date = new Date(params);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/tasks/gettasks/${user._id}`
        );

        console.log(response.data);

        if (response.data.status === "successfull") {
          dispatch(setTasks(response.data.data));
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  const handleMenuClick = async (taskId, action) => {
    console.log(`Task ID: ${taskId}, Action: ${action}`); // Debugging log
    if (action === "delete") {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/tasks/delete/${taskId}/${user._id}`
        );
        if (response.data.status === "success") {
          dispatch(setTasks(response.data.tasks));
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    } else if (action === "edit") {
      const task = tasks.find((task) => task._id === taskId);
      setCurrentTask(task);
      setTaskDetails({
        title: task.title,
        description: task.description,
        date: task.date,
      });
      setIsModalOpen(true);
    } else {
      try {
        const response = await axios.patch(
          `http://localhost:3000/api/v1/tasks/update/${taskId}`,
          { status: action }
        );
        if (response.data.status === "success") {
          dispatch(setTasks(response.data.tasks));
        }
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/tasks/update/${currentTask._id}`,
        taskDetails
      );
      if (response.data.status === "success") {
        dispatch(setTasks(response.data.tasks));
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const items = [
    {
      key: "1",
      label: "pending",
      onClick: (e) => handleMenuClick(e.key, "pending"),
    },
    {
      key: "2",
      label: "in progress",
      onClick: (e) => handleMenuClick(e.key, "in progress"),
    },
    {
      key: "3",
      label: "completed",
      onClick: (e) => handleMenuClick(e.key, "completed"),
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "volcano";
      case "in progress":
        return "geekblue";
      case "completed":
        return "green";
      default:
        return "default";
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <Card key={task._id} title={task.title} style={{ marginBottom: 16 }}>
          <p>{task.description}</p>
          <p>{formatDate(task.date)}</p>
          <Dropdown
            overlay={
              <Menu onClick={(e) => handleMenuClick(task._id, e.key)}>
                {items.map((item) => (
                  <Menu.Item key={item.label}>{item.label}</Menu.Item>
                ))}
              </Menu>
            }
            placement="bottom"
          >
            <Button className="flex w-fit-content items-center gap-5 justify-between">
              <Tag
                color={getStatusColor(task.status)}
                className="w-fit-content"
              >
                {task.status}
              </Tag>
              <DownOutlined />
            </Button>
          </Dropdown>
          <Button
            onClick={() => handleMenuClick(task._id, "edit")}
            style={{ marginLeft: 8 }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleMenuClick(task._id, "delete")}
            style={{ marginLeft: 8 }}
            danger
          >
            Delete
          </Button>
        </Card>
      ))}
      <Modal
        title="Edit Task"
        open={isModalOpen}
        onOk={handleUpdateTask}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          name="title"
          placeholder="Task Title"
          value={taskDetails.title}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
        <Input
          name="description"
          placeholder="Task Description"
          value={taskDetails.description}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
        <Input
          name="date"
          type="date"
          placeholder="Task Date"
          value={taskDetails.date}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
      </Modal>
    </div>
  );
};

export default TaskList;
