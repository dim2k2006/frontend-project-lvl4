import { createSlice } from '@reduxjs/toolkit';
import { getUserName as getName } from '../../utils';

const userName = createSlice({
  name: 'userName',
  initialState: getName(),
  reducers: {},
});

export const getUserName = (state) => state.userName;

export default userName.reducer;
