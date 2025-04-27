import { useState, useEffect } from 'react';
import { TextField, Button, Stack, Paper } from '@mui/material';

const ExpenseForm = ({ onSave, editData, onCancelEdit }) => {
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        date: ''
    });

    useEffect(() => {
        if (editData) {
            setFormData(editData);
        }
    }, [editData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setFormData({ amount: '', category: '', description: '', date: '' });
    };

    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField label="Amount" name="amount" type="number" value={formData.amount} onChange={handleChange} required />
                    <TextField label="Category" name="category" value={formData.category} onChange={handleChange} required />
                    <TextField label="Description" name="description" value={formData.description} onChange={handleChange} />
                    <TextField label="Date" name="date" type="date" InputLabelProps={{ shrink: true }} value={formData.date} onChange={handleChange} required />
                    <Stack direction="row" spacing={2}>
                        <Button type="submit" variant="contained" color="primary">{editData ? "Update" : "Add"} Expense</Button>
                        {editData && (
                            <Button variant="outlined" color="secondary" onClick={onCancelEdit}>
                                Cancel
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </form>
        </Paper>
    );
};

export default ExpenseForm;
