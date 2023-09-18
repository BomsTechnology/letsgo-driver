import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 

export interface TaskViewState { 
  refresh: boolean; 
}

const initialState: TaskViewState = {
  refresh: false, 
};


const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    toggleRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  }, 
});

export const { toggleRefresh } =
taskSlice.actions;

export default taskSlice.reducer;
