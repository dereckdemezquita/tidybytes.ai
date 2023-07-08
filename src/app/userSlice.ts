import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    loggedIn: boolean;
    username?: string;
}

const initialState: UserState = {
    loggedIn: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.loggedIn = true;
            state.username = action.payload;
        },
        logout: state => {
            state.loggedIn = false;
            state.username = undefined;
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
