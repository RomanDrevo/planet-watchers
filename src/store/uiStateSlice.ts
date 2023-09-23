import { createSlice } from '@reduxjs/toolkit';


const uiStateSlice = createSlice({
    name: 'uiState',
    initialState: {
        isLoading: true,
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;  // Updating the isLoading field
        },
    },
});

export const { setIsLoading } = uiStateSlice.actions;
export default uiStateSlice.reducer;
