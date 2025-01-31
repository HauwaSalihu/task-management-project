import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    userTasks: [],
  },

  reducers: {
    updateUserTasks: (state, action) => {
      state.userTasks.push(action.payload);
    },
    setTasks: (state, action) => {
      state.userTasks = action.payload;
    },
  },
});

export const { updateUserTasks, setTasks } = taskSlice.actions;

export default taskSlice.reducer;
