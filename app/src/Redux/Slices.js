import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
    name: "tokenSlice",
    initialState: {
        token: null,
        sessionId: null,
        user: null
    },
    reducers: {
        setToken: (state, action) => {
            const { token, sessionId, user } = action.payload;
            state.token = token;
            state.sessionId = sessionId;
            state.user = user;
        }
    }
});
export const { setToken } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;