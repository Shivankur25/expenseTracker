import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box, Button } from '@mui/material';
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import React from "react";
import { createExpense, deleteExpense as deleteExp, updateExpense as updateExp } from "../services/expenseService";
import { addExpense, deleteExpense, updateExpense } from "../store/slices/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/userSlice";

const COLORS = ['#00C49F', '#FF6384', '#36A2EB', '#FFCE56', '#8E44AD'];

const Dashboard = ({ expenses = [] }) => {
    const [editData, setEditData] = React.useState(null);
    const dispatch = useDispatch();
    const { expenseList } = useSelector(state => state.expenses);

    const categoryData = [];
    const monthData = {};

    const handleSave = async (data) => {
        if (editData) {
            const res = await updateExp(editData._id, data);
            dispatch(updateExpense(res.data));
            setEditData(null);
        } else {
            const res = await createExpense(data);
            dispatch(addExpense(res.data));
        }
    };

    const handleDelete = async (id) => {
        await deleteExp(id);
        dispatch(deleteExpense(id));
    };

    const handleEdit = (expense) => {
        setEditData(expense);
    };

    const handleCancelEdit = () => {
        setEditData(null);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    expenses.forEach(exp => {
        const cat = categoryData.find(c => c.name === exp.category);
        if (cat) cat.value += exp.amount;
        else categoryData.push({ name: exp.category, value: exp.amount });

        const month = new Date(exp.date).toLocaleString('default', { month: 'short' });
        monthData[month] = (monthData[month] || 0) + exp.amount;
    });

    const monthDataArray = Object.keys(monthData).map(month => ({ month, amount: monthData[month] }));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, mt: 4, flexWrap: 'wrap' }}>
            <Button
                variant="contained"
                color="secondary"
                sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    zIndex: 10
                }}
                onClick={handleLogout}
            >
                Logout
            </Button>

            <ExpenseForm onSave={handleSave} editData={editData} onCancelEdit={handleCancelEdit} />
            <ExpenseList expenses={expenseList} onEdit={handleEdit} onDelete={handleDelete} />

            <Paper elevation={6} sx={{ p: 3, width: 400 }}>
                <Typography variant="h5" align="center" gutterBottom>Category Distribution</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                            animationBegin={0}
                            animationDuration={800}
                            animationEasing="ease-out"
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Paper>

            <Paper elevation={6} sx={{ p: 3, width: 600 }}>
                <Typography variant="h5" align="center" gutterBottom>Monthly Spending</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthDataArray}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="url(#colorUv)" barSize={30} />
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#83a6ed" stopOpacity={0.8}/>
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
};

export default Dashboard;
