import { List, ListItem, ListItemText, IconButton, Paper, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>Expense List</Typography>
            {expenses.length === 0 ? (
                <Typography>No expenses yet.</Typography>
            ) : (
                <List>
                    {expenses.map(exp => (
                        <ListItem
                            key={exp._id}
                            secondaryAction={
                                <>
                                    <IconButton edge="end" aria-label="edit" onClick={() => onEdit(exp)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => onDelete(exp._id)}>
                                        <Delete />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemText
                                primary={`₹${exp.amount} - ${exp.category}`}
                                secondary={`${exp.description} (${new Date(exp.date).toLocaleDateString()})`}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );
};

export default ExpenseList;
