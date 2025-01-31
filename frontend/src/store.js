import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/task/userSlice";
import taskReducer from "./features/task/taskSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
  },
});
