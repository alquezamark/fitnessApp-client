import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AddWorkout() {
    const [show, setShow] = useState(false);
    const [workout, setWorkout] = useState({ name: '', duration: '' });
    const navigate = useNavigate(); // ✅ Use navigate for redirection

    const handleAddWorkout = () => {
        fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(workout)
        }).then(() => {
            setShow(false);
            setWorkout({ name: '', duration: '' });
            navigate('/workouts'); // ✅ Redirect to workouts page
        });
    };

    return (
        <>
            <Button id="addWorkout" onClick={() => setShow(true)}>Add Workout</Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={workout.name} onChange={(e) => setWorkout({ ...workout, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type="text" value={workout.duration} onChange={(e) => setWorkout({ ...workout, duration: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddWorkout}>Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
