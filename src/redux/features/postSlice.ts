import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostElement } from '@/types';

interface PostState {
  posts: PostElement[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostElement[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
