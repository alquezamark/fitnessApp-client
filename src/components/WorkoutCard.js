import { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

export default function WorkoutCard({ workout, fetchWorkouts }) {
    const [showModal, setShowModal] = useState(false);
    const [updatedWorkout, setUpdatedWorkout] = useState({ name: workout.name, duration: workout.duration });

    const handleDelete = () => {
        fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${workout._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => fetchWorkouts());
    };

    const handleUpdate = () => {
        fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/updateWorkout/${workout._id}`, {
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

    const handleComplete = () => {
        fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${workout._id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => fetchWorkouts());
    };

    return (
        <>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>{workout.name}</Card.Title>
                    <Card.Text>Duration: {workout.duration}</Card.Text>
                    <Card.Text>Date Added: {new Date(workout.dateAdded).toLocaleDateString()}</Card.Text>
                    <Card.Text>Status: {workout.status}</Card.Text>
                    <Button variant="success" onClick={handleComplete} disabled={workout.status === "Completed"}>
                        {workout.status === "Completed" ? "Completed" : "Mark as Complete"}
                    </Button>{' '}
                    <Button variant="primary" onClick={() => setShowModal(true)}>Edit</Button>{' '}
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={updatedWorkout.name} onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type="text" value={updatedWorkout.duration} onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, duration: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
