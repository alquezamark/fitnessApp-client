import { useState, useContext, useEffect } from 'react';
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
         console.log("API Response:", data); // Debugging

         if (data.message === "Registered Successfully") { // ✅ Fix condition
             Swal.fire({
                 title: "Registered Successfully",
                 icon: "success",
                 text: "You can now log in to your account.",
                 confirmButtonColor: "#28a745"
             }).then(() => {
                 navigate('/login'); // ✅ Redirect after success
             });
         } else {
             Swal.fire({ 
                 title: "Registration Failed", 
                 text: data.error || "An unknown error occurred.", 
                 icon: "error" 
             });
         }
     })
     .catch(error => {
         console.error("Error during registration:", error);
         Swal.fire({ 
             title: "Registration Failed", 
             text: "An error occurred while processing your request.", 
             icon: "error" 
         });
     });

     // Reset form fields
     setEmail('');
     setPassword('');
 }



    // Enable button when both fields are filled
    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    return (
        <Container>
            <h1 className="text-center">Register</h1>
            <Form onSubmit={registerUser}>
                <Form.Group className="mt-4">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter Email" 
                        required 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mt-2 mb-4">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter Password" 
                        required 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Container className="text-center">
                    <Button type="submit" className="btn-primary py-2 px-4" disabled={!isActive}>
                        Register
                    </Button>
                </Container>                        
            </Form>
        </Container>
    );
}
