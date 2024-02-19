import { configureStore } from '@reduxjs/toolkit';
import dataItemReducer from './DataItemSlice';
import dataListReducer from "./DataListSlice.js";

export const store = configureStore({ reducer: {dataList: dataListReducer, dataItem: dataItemReducer} });