import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import UserContext from '../UserContext';
import AddWorkout from '../pages/AddWorkout';

export default function Workouts() {
    const { user } = useContext(UserContext);
    const [workouts, setWorkouts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [updatedWorkout, setUpdatedWorkout] = useState({ name: '', duration: '' });

    const fetchWorkouts = () => {
        fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setWorkouts(data.workouts || []));
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const handleDelete = (id) => {
        fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => fetchWorkouts());
    };

    const handleShowModal = (workout) => {
        setSelectedWorkout(workout);
        setUpdatedWorkout({ name: workout.name, duration: workout.duration });
        setShowModal(true);
    };

    const handleUpdate = () => {
        fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/updateWorkout/${selectedWorkout._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(updatedWorkout)
        }).then(() => {
            setShowModal(false);
            fetchWorkouts();
        });
    };

    const handleComplete = (id) => {
        fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => fetchWorkouts());
    };

    return (
        <Container className='mt-5'>
            <h1 className='text-center'>My Workouts</h1>
            <AddWorkout fetchWorkouts={fetchWorkouts} />
            <Row className='mt-4'>
                {workouts.map(workout => (
                    <Col md={4} key={workout._id} className='mb-3'>
                        <Card>
                            <Card.Body>
                                <Card.Title>{workout.name}</Card.Title>
                                <Card.Text>Duration: {workout.duration}</Card.Text>
                                <Card.Text>Date Added: {new Date(workout.dateAdded).toLocaleDateString()}</Card.Text>
                                <Card.Text>Status: {workout.status}</Card.Text>
                                <Button variant='success' onClick={() => handleComplete(workout._id)} disabled={workout.status === "Completed"}>
                                    {workout.status === "Completed" ? "Completed" : "Mark as Complete"}
                                </Button>{' '}
                                <Button variant='primary' onClick={() => handleShowModal(workout)}>Edit</Button>{' '}
                                <Button variant='danger' onClick={() => handleDelete(workout._id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' value={updatedWorkout.name} onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type='text' value={updatedWorkout.duration} onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, duration: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant='primary' onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
