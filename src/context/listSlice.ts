import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  age: number;
}

const initialState: User[] = [];

const listSlice = createSlice({
  initialState,
  name: 'USER_LIST',
  reducers: {
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.push(payload);
    },
    removeUser: (state, { payload }: PayloadAction<number>) => {
      return state.filter(user => user.id !== payload);
    },
  },
});

export const { addUser, removeUser } = listSlice.actions;
export default listSlice.reducer;
