import { createSlice } from "@reduxjs/toolkit";

const dataListSlice = createSlice({
    name: 'dataList',
    initialState: {
        isLoaded: false,
        data: []
    },
    reducers: {
        setIsLoaded(state, action) {
            return { ...state, isLoaded: action.payload };
        },
        setData(state, action) {
            return { ...state, data: action.payload };
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getItemPageData.pending, (state) => {
    //             state.isLoaded = false;
    //         })
    //         .addCase(getItemPageData.fulfilled, (state, action) => {
    //             state.data = DataItemSerializer(action.payload);
    //             state.isLoaded = true;
    //         })
    //         .addCase(getItemPageData.rejected, (state) => {
    //             state.isLoaded = true;
    //         })
    //
    // }
})

export const { setData } = dataListSlice.actions;

const dataListReducer = dataListSlice.reducer;

export default dataListReducer;