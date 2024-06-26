import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosConfig';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [currentTask, setCurrentTask] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get('/tasks/all');
            setTasks(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const handleAddTask = async () => {
        try {
            await axiosInstance.post('/tasks/store', currentTask);
            fetchTasks();
            setOpenAddDialog(false);
            setCurrentTask({ name: '', description: '' });
        } catch (error) {
            setError(error);
        }
    };

    const handleEditTask = async () => {
        try {
            await axiosInstance.put(`/tasks/update/${currentTask.pkid_task}`, currentTask);
            fetchTasks();
            setOpenEditDialog(false);
            setCurrentTask({ name: '', description: '' });
        } catch (error) {
            setError(error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axiosInstance.delete(`/tasks/delete/${id}`);
            fetchTasks();
        } catch (error) {
            setError(error);
        }
    };

    const handleOpenEditDialog = (task) => {
        setCurrentTask(task);
        setOpenEditDialog(true);
    };

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert severity="error">Error: {error.message}</Alert>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Tasks
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
                Add Task
            </Button>
            <Grid container spacing={3} style={{ marginTop: 20 }}>
                {tasks.map(task => (
                    <Grid item xs={12} sm={6} md={4} key={task.pkid_task}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {task.name}
                                </Typography>
                                <Typography color="textSecondary">
                                    Description: {task.description}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginTop: 10 }}
                                    onClick={() => handleOpenEditDialog(task)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    style={{ marginTop: 10, marginLeft: 10 }}
                                    onClick={() => handleDeleteTask(task.pkid_task)}
                                >
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add Task Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Task Name"
                        type="text"
                        fullWidth
                        value={currentTask.name}
                        onChange={(e) => setCurrentTask({ ...currentTask, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={currentTask.description}
                        onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddTask} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Task Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Task Name"
                        type="text"
                        fullWidth
                        value={currentTask.name}
                        onChange={(e) => setCurrentTask({ ...currentTask, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={currentTask.description}
                        onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditTask} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Tasks;
