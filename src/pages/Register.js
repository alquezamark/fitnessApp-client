
import { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import UserContext from '../UserContext';

export default function Register() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    function registerUser(e) {
        e.preventDefault();
        
        fetch(`https://fitnessapp-api-ln8u.onrender.com/users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "User registered successfully") {
                Swal.fire({ title: "Registered Successfully", icon: "success" });
                navigate('/login');
            } else {
                Swal.fire({ title: "Registration Failed", text: data.error, icon: "error" });
            }
        });
    }

    return (
        <Container>
            <h1>Register</h1>
            <Form onSubmit={registerUser}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </Form.Group>
                <Button type="submit" disabled={!isActive}>Register</Button>
            </Form>
        </Container>
    );
}
