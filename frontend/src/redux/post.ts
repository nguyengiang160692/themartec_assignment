import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import apiService from '../lib/apiService';
import { openSnackbar } from './snackbar';

const initialState = {
    posts: [],
}

export const postSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {

    },
});

export const { } = postSlice.actions;

export const newPost = (content: string, cb: Function): AppThunk => async (dispatch, getState) => {
    try {
        await apiService.post('/post', {
            content: content
        })

        dispatch(openSnackbar({
            message: 'Successfully created a new post!',
            severity: 'success',
        }));

        cb && cb();
    } catch (err) {
        console.log(err);
    }
}

export default postSlice.reducer;