import { createSlice } from '@reduxjs/toolkit';
import { genUserName } from '../../utils';

const userName = createSlice({
  name: 'userName',
  initialState: genUserName(),
  reducers: {},
});

export const getUserName = (state) => state.userName;

export default userName.reducer;
