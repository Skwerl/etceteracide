import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
    name: "tokenSlice",
    initialState: {
        token: null,
        sessionId: null
    },
    reducers: {
        setToken: (state, action) => {
            const { token, sessionId } = action.payload;
            state.token = token;
            state.sessionId = sessionId;
        }
    }
});
export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;