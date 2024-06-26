import React, { useEffect, useState } from 'react';
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

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [currentProject, setCurrentProject] = useState({ name: '', created_date: '', end_date: '' });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axiosInstance.get('/projects/all');
            setProjects(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const handleAddProject = async () => {
        try {
            await axiosInstance.post('/projects/store', currentProject);
            fetchProjects();
            setOpenAddDialog(false);
            setCurrentProject({ name: '', created_date: '', end_date: '' });
        } catch (error) {
            setError(error);
        }
    };

    const handleEditProject = async () => {
        try {
            await axiosInstance.put(`/projects/update/${currentProject.pkid_project}`, currentProject);
            fetchProjects();
            setOpenEditDialog(false);
            setCurrentProject({ name: '', created_date: '', end_date: '' });
        } catch (error) {
            setError(error);
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            await axiosInstance.delete(`/projects/delete/${id}`);
            fetchProjects();
        } catch (error) {
            setError(error);
        }
    };

    const handleOpenEditDialog = (project) => {
        setCurrentProject(project);
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
                Projects
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
                Add Project
            </Button>
            <Grid container spacing={3} style={{ marginTop: 20 }}>
                {projects.map(project => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={project.pkid_project}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {project.name}
                                </Typography>
                                <Typography color="textSecondary">
                                    Created Date: {project.created_date}
                                </Typography>
                                <Typography color="textSecondary">
                                    End Date: {project.end_date || 'Ongoing'}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginTop: 10 }}
                                    onClick={() => handleOpenEditDialog(project)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    style={{ marginTop: 10, marginLeft: 10 }}
                                    onClick={() => handleDeleteProject(project.pkid_project)}
                                >
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add Project Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Add Project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Project Name"
                        type="text"
                        fullWidth
                        value={currentProject.name}
                        onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        type="date"
                        fullWidth
                        value={currentProject.created_date}
                        onChange={(e) => setCurrentProject({ ...currentProject, created_date: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="End Date"
                        type="date"
                        fullWidth
                        value={currentProject.end_date}
                        onChange={(e) => setCurrentProject({ ...currentProject, end_date: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddProject} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Project Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Project Name"
                        type="text"
                        fullWidth
                        value={currentProject.name}
                        onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        type="date"
                        fullWidth
                        value={currentProject.created_date}
                        onChange={(e) => setCurrentProject({ ...currentProject, created_date: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="End Date"
                        type="date"
                        fullWidth
                        value={currentProject.end_date}
                        onChange={(e) => setCurrentProject({ ...currentProject, end_date: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditProject} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Projects;
