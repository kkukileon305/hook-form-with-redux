import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
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
    removeUser: (state, { payload }: PayloadAction<string>) => {
      return state.filter(user => user.name !== payload);
    },
  },
});

export const { addUser, removeUser } = listSlice.actions;
export default listSlice.reducer;
