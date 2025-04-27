import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './slices/expenseSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        expenses: expenseReducer,
        auth: userReducer
    },
});

export default store;
