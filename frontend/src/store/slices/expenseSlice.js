import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenseList: [],
    history: []
};

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setExpenses: (state, action) => {
            state.expenseList = action.payload;
        },
        addExpense: (state, action) => {
            state.expenseList.push(action.payload);
            state.history.push({ action: 'Added', data: action.payload, date: new Date().toISOString() });
        },
        updateExpense: (state, action) => {
            const index = state.expenseList.findIndex(exp => exp._id === action.payload._id);
            if (index !== -1) {
                state.expenseList[index] = action.payload;
                state.history.push({ action: 'Updated', data: action.payload, date: new Date().toISOString() });
            }
        },
        deleteExpense: (state, action) => {
            state.expenseList = state.expenseList.filter(exp => exp._id !== action.payload);
            state.history.push({ action: 'Deleted', id: action.payload, date: new Date().toISOString() });
        }
    }
});

export const { setExpenses, addExpense, updateExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
