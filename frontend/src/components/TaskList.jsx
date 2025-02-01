import { useEffect, useState } from "react";
import {
  Dropdown,
  Tag,
  Card,
  Button,
  Menu,
  Input,
  Modal,
  Pagination,
  Spin,
  notification,
} from "antd";
import { DownOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTasks } from "../features/task/taskSlice";
import Filter from "./Filter";
import { serverUrl } from "../utils/helper";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.userTasks);
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    title: "",
    description: "",
    date: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  function formatDate(params) {
    const date = new Date(params);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  }

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${serverUrl}/tasks/gettasks/${user._id}`
        );

        console.log(response.data);

        if (response.data.status === "successfull") {
          dispatch(setTasks(response.data.data));
          notification.success({
            message: "Success",
            description: "Task deleted successfully.",
          });
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error.message);
        notification.error({
          message: "Error",
          description: "Failed to fetch tasks. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [dispatch, user._id]);

  const handleMenuClick = async (taskId, action) => {
    console.log(`Task ID: ${taskId}, Action: ${action}`); // Debugging log
    setIsLoading(true);
    setError(null);
    if (action === "delete") {
      try {
        const response = await axios.delete(
          `${serverUrl}/tasks/delete/${taskId}/${user._id}`
        );
        if (response.data.status === "success") {
          dispatch(setTasks(response.data.tasks));
          notification.success({
            message: "Success",
            description: "Task deleted successfully.",
          });
        }
      } catch (error) {
        console.error(
          `Error ${action === "delete" ? "deleting" : "updating"} task:`,
          error
        );
        setError(error.message);
        notification.error({
          message: "Error",
          description: `Failed to ${
            action === "delete" ? "delete" : "update"
          } task. Please try again later.`,
        });
      } finally {
        setIsLoading(false);
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
          `${serverUrl}/tasks/update/${taskId}`,
          { status: action }
        );
        if (response.data.status === "success") {
          dispatch(setTasks(response.data.tasks));
          notification.success({
            message: "Success",
            description: "Task status updated successfully.",
          });
        }
      } catch (error) {
        console.error(
          `Error ${action === "edit" ? "editing" : "updating"} task:`,
          error
        );
        setError(error.message);
        notification.error({
          message: "Error",
          description: `Failed to ${
            action === "edit" ? "edit" : "update"
          } task. Please try again later.`,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdateTask = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.patch(
        `${serverUrl}/tasks/update/${currentTask._id}`,
        taskDetails
      );
      if (response.data.status === "success") {
        dispatch(setTasks(response.data.tasks));
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setError(error.message);
      notification.error({
        message: "Error",
        description: "Failed to update task. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
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

  const filteredTasks = tasks.filter((task) => {
    return (
      (filters.status === "all" || task.status === filters.status) &&
      (filters.title === "" ||
        task.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.description === "" ||
        task.description
          .toLowerCase()
          .includes(filters.description.toLowerCase())) &&
      (filters.date === "" || formatDate(task.date) === filters.date)
    );
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Task List</h1>
      <Filter onFilterChange={handleFilterChange} />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {error}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTasks.map((task) => (
              <Card
                key={task._id}
                className="shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{task.title}</h2>
                  <p className="text-gray-600 mb-2">{task.description}</p>
                  <p className="text-gray-400 mb-4">{formatDate(task.date)}</p>
                  <div className="flex justify-between items-center">
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
                      <Button className="flex items-center gap-2">
                        <Tag color={getStatusColor(task.status)}>
                          {task.status}
                        </Tag>
                        <DownOutlined />
                      </Button>
                    </Dropdown>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleMenuClick(task._id, "edit")}
                        type="primary"
                      >
                        <EditOutlined />
                      </Button>
                      <div className="bg-red-500 text-white rounded-md hover:text-red-700 cursor-pointer p-1 px-4 ">
                        <DeleteOutlined
                          onClick={() => handleMenuClick(task._id, "delete")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              pageSize={tasksPerPage}
              total={filteredTasks.length}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
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
